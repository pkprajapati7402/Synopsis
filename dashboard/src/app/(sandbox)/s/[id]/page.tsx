"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAction, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { SandboxVoice } from "@/components/SandboxVoice";
import {
  SandboxHumeTelemetry,
  emotionToDotColor,
} from "@/components/SandboxHumeTelemetry";
import { SandboxMouseTelemetry } from "@/components/SandboxMouseTelemetry";
import { startMouseTracking, stopMouseTracking } from "@/lib/sandboxMouseTracking";
import {
  initSandbox,
  uploadSandboxFiles,
  listFiles,
  exportSandboxFiles,
} from "@/lib/workerClient";
import {
  ArrowLeft,
  GitPullRequest,
  ExternalLink,
  FileCode,
  BarChart2,
  Loader2,
} from "lucide-react";
import type { HumeEmotionMap } from "@/ux_telemetry";

function useSandboxSessionId(): string {
  const ref = useRef<string | null>(null);
  if (ref.current === null) {
    ref.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
  return ref.current;
}

const WORKER_BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_WORKER_BASE_URL
    : undefined;

export default function SandboxPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const sessionId = useSandboxSessionId();
  const workerBase = WORKER_BASE_URL ?? "";

  const onSandboxFrameLoad = useCallback(() => {
    if (id && sessionId) startMouseTracking(id, sessionId);
  }, [id, sessionId]);

  const sandbox = useQuery(
    api.sandboxes.getSandboxForCurrentUser,
    id ? { sandboxId: id } : "skip",
  );
  const ensureSandboxOnWorker = useAction(api.sandboxes.ensureSandboxOnWorker);
  const importFromGitHub = useAction(api.sandboxes.importFromGitHub);
  const createPullRequest = useAction(api.sandboxes.createPullRequest);

  const [workerReady, setWorkerReady] = useState(false);
  const [workerError, setWorkerError] = useState<string | null>(null);
  const [emotionColor, setEmotionColor] = useState<"green" | "yellow" | "red">("yellow");
  const [updatedFiles, setUpdatedFiles] = useState<string[]>([]);
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [prNumber, setPrNumber] = useState<number | null>(null);

  const handleEmotionSample = useCallback((emotions: HumeEmotionMap) => {
    setEmotionColor(emotionToDotColor(emotions));
  }, []);

  const cachedSandboxRef = useRef<{ id: string; value: unknown } | null>(null);
  if (sandbox !== undefined && id) {
    cachedSandboxRef.current = { id, value: sandbox };
  }
  const resolvedSandbox =
    sandbox !== undefined
      ? sandbox
      : id && cachedSandboxRef.current?.id === id
        ? cachedSandboxRef.current.value
        : undefined;

  useEffect(() => {
    if (resolvedSandbox && (resolvedSandbox as any).prUrl) {
      setPrUrl((resolvedSandbox as any).prUrl);
      setPrNumber((resolvedSandbox as any).prNumber ?? null);
    }
  }, [resolvedSandbox]);

  // Stop mouse tracking when tab is hidden or component unmounts.
  useEffect(() => {
    if (typeof window === "undefined" || !id) return;
    const onVisChange = () => {
      if (document.visibilityState === "hidden") stopMouseTracking();
    };
    const onPageHide = () => stopMouseTracking();
    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("pagehide", onPageHide);
      stopMouseTracking();
    };
  }, [id]);

  useEffect(() => {
    if (!id || !sandbox || workerReady || workerError) return;
    let cancelled = false;

    (async () => {
      try {
        await ensureSandboxOnWorker({ sandboxId: id });
        if (workerBase) {
          await initSandbox({ sandboxId: id }).catch((err) =>
            console.warn("Client initSandbox notice:", err)
          );

          // Only import from GitHub on the initial fresh sandbox setup
          // (prevents wiping out user changes when the page refreshes)
          const repo = (resolvedSandbox as any)?.githubRepo;
          if (repo) {
            try {
              const fileList: { files: string[] } = await listFiles({ sandboxId: id }).catch(() => ({ files: [] }));
              const filesSet = new Set(fileList.files);
              const isFresh =
                fileList.files.length === 0 ||
                (filesSet.has("index.html") &&
                  filesSet.has("app.js") &&
                  !filesSet.has("books.html") &&
                  !filesSet.has("script.js"));

              if (isFresh) {
                const res = await importFromGitHub({ sandboxId: id, repoUrl: repo });
                if (res?.outputFiles && Object.keys(res.outputFiles).length > 0) {
                  await uploadSandboxFiles({ sandboxId: id, files: res.outputFiles });
                }
              }
            } catch (gitErr) {
              console.warn("GitHub import error:", gitErr);
            }
          }
        }
        if (!cancelled) setWorkerReady(true);
      } catch (err) {
        if (workerBase) {
          try {
            await initSandbox({ sandboxId: id });
            const repo = (resolvedSandbox as any)?.githubRepo;
            if (repo) {
              try {
                const fileList: { files: string[] } = await listFiles({ sandboxId: id }).catch(() => ({ files: [] }));
                const filesSet = new Set(fileList.files);
                const isFresh =
                  fileList.files.length === 0 ||
                  (filesSet.has("index.html") &&
                    filesSet.has("app.js") &&
                    !filesSet.has("books.html") &&
                    !filesSet.has("script.js"));

                if (isFresh) {
                  const res = await importFromGitHub({ sandboxId: id, repoUrl: repo });
                  if (res?.outputFiles && Object.keys(res.outputFiles).length > 0) {
                    await uploadSandboxFiles({ sandboxId: id, files: res.outputFiles });
                  }
                }
              } catch (gitErr) {
                console.warn("GitHub import fallback error:", gitErr);
              }
            }
            if (!cancelled) {
              setWorkerReady(true);
              return;
            }
          } catch (clientErr) {
            console.error("Client initSandbox fallback error:", clientErr);
          }
        }
        if (!cancelled) {
          setWorkerError(err instanceof Error ? err.message : "Failed to start sandbox");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, sandbox, ensureSandboxOnWorker, importFromGitHub, resolvedSandbox, workerReady, workerError, workerBase]);

  const handleCreatePR = async () => {
    if (!id || isCreatingPR) return;
    setIsCreatingPR(true);
    try {
      let files: Record<string, string> | undefined;
      try {
        const exported = await exportSandboxFiles({ sandboxId: id });
        files = exported.files;
      } catch (e) {
        console.warn("Could not export files from worker directly:", e);
      }

      let token =
        process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
        (typeof window !== "undefined" ? localStorage.getItem("synapse_github_token") : null);

      if (!token) {
        const inputToken = window.prompt(
          "Enter your GitHub Personal Access Token (classic) to create the pull request on GitHub:\n\nTip: You can create a token with 'repo' scope at:\nhttps://github.com/settings/tokens"
        );
        if (!inputToken || !inputToken.trim()) {
          setIsCreatingPR(false);
          return;
        }
        token = inputToken.trim();
        if (typeof window !== "undefined") {
          localStorage.setItem("synapse_github_token", token);
        }
      }

      const res = await createPullRequest({
        sandboxId: id,
        files,
        githubToken: token,
      });
      if (res?.prUrl) {
        setPrUrl(res.prUrl);
        setPrNumber(res.prNumber ?? null);
        window.open(res.prUrl, "_blank");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/401|Bad credentials|GITHUB_TOKEN/i.test(msg)) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("synapse_github_token");
        }
      }
      alert(`Could not create PR: ${msg}`);
    } finally {
      setIsCreatingPR(false);
    }
  };

  const handleFilesUpdated = useCallback((newFiles: string[]) => {
    setUpdatedFiles((prev) => Array.from(new Set([...prev, ...newFiles])));
  }, []);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Invalid sandbox.
      </div>
    );
  }

  if (!workerBase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground p-6">
        <p>
          Set{" "}
          <code className="font-mono text-foreground">
            NEXT_PUBLIC_WORKER_BASE_URL
          </code>{" "}
          so the sandbox can load.
        </p>
      </div>
    );
  }

  if (resolvedSandbox === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (resolvedSandbox === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground p-6">
        <p className="text-center">Access denied. This sandbox is not assigned to you.</p>
      </div>
    );
  }

  if (workerError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground p-6">
        <p className="text-center text-destructive">{workerError}</p>
      </div>
    );
  }

  if (!workerReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-label="Starting sandbox" />
      </div>
    );
  }

  const iframeSrc = `${workerBase.replace(/\/$/, "")}/s/${id}/`;
  const projectId = (resolvedSandbox as any)?.projectId;
  const projectTitle =
    (resolvedSandbox as any)?.projectName ||
    (resolvedSandbox as any)?.name ||
    "Project";

  return (
    <>
      {/* ── Top Floating Navigation & PR Bar ── */}
      <div className="fixed top-3 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Left: Back button + Project / Sandbox info */}
        <div className="flex items-center gap-2 pointer-events-auto bg-zinc-900/90 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg text-xs text-white">
          <Link
            href={
              projectId
                ? `/${(resolvedSandbox as any).userId || "dashboard"}/${projectId}`
                : "/dashboard"
            }
            className="flex items-center gap-1.5 hover:text-white/80 transition-colors py-0.5 px-1"
            title="Back to project dashboard"
          >
            <ArrowLeft className="size-3.5" />
            <span className="font-medium hidden sm:inline">Dashboard</span>
          </Link>
          <span className="text-white/30">•</span>
          <span className="font-semibold text-white/90 truncate max-w-[140px] sm:max-w-[200px]">
            {projectTitle}
          </span>
          <span className="text-white/40 font-mono text-[11px] hidden sm:inline">
            ({id})
          </span>
        </div>

        {/* Right: Updated files badge + Create PR button + Analytics link */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {updatedFiles.length > 0 && (
            <div
              className="flex items-center gap-1.5 bg-emerald-950/85 border border-emerald-500/40 text-emerald-300 backdrop-blur-md rounded-full px-3 py-1.5 text-xs shadow-lg animate-in fade-in"
              title={`Modified files: ${updatedFiles.join(", ")}`}
            >
              <FileCode className="size-3.5 text-emerald-400" />
              <span>
                {updatedFiles.length} file{updatedFiles.length > 1 ? "s" : ""} modified:{" "}
                <span className="font-mono text-[11px] text-emerald-200">
                  {updatedFiles.slice(0, 2).join(", ")}
                  {updatedFiles.length > 2 ? "…" : ""}
                </span>
              </span>
            </div>
          )}

          {prUrl ? (
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/40 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg transition-all"
            >
              <GitPullRequest className="size-3.5" />
              <span>PR #{prNumber ?? "Open"}</span>
              <ExternalLink className="size-3 opacity-70" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleCreatePR}
              disabled={isCreatingPR}
              className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/10 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isCreatingPR ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Creating PR…</span>
                </>
              ) : (
                <>
                  <GitPullRequest className="size-3.5 text-purple-400" />
                  <span>Create PR</span>
                </>
              )}
            </button>
          )}

          {projectId && (
            <Link
              href={`/${(resolvedSandbox as any)?.userId || "dashboard"}/${projectId}/${id}/analytics`}
              className="flex items-center gap-1 bg-zinc-900/90 hover:bg-zinc-800 text-white/70 hover:text-white border border-white/10 backdrop-blur-md rounded-full p-2 text-xs shadow-lg transition-colors"
              title="View Sandbox Analytics"
            >
              <BarChart2 className="size-3.5" />
            </Link>
          )}
        </div>
      </div>

      <iframe
        id="sandboxFrame"
        src={iframeSrc}
        className="w-full h-screen border-0"
        title={`Sandbox ${id}`}
        onLoad={onSandboxFrameLoad}
      />
      <SandboxVoice
        sandboxId={id}
        emotionColor={emotionColor}
        onFilesUpdated={handleFilesUpdated}
      />
      <SandboxHumeTelemetry
        sandboxId={id}
        sessionId={sessionId}
        onEmotionSample={handleEmotionSample}
      />
      <SandboxMouseTelemetry sandboxId={id} sessionId={sessionId} />
    </>
  );
}
