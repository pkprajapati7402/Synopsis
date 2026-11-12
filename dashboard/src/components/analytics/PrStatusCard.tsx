"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitPullRequest, Loader2 } from "lucide-react";
import { exportSandboxFiles } from "@/lib/workerClient";

type Sandbox = {
  id: string;
  prUrl?: string | null;
  prNumber?: number | null;
};

type PrStatusCardProps = {
  sandbox: Sandbox;
};

export function PrStatusCard({ sandbox }: PrStatusCardProps) {
  const createPullRequest = useAction(api.sandboxes.createPullRequest);
  const [loading, setLoading] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(sandbox.prUrl ?? null);

  async function handleCreateOrUpdatePr() {
    setLoading(true);
    try {
      let files: Record<string, string> | undefined;
      try {
        const exported = await exportSandboxFiles({ sandboxId: sandbox.id });
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
          setLoading(false);
          return;
        }
        token = inputToken.trim();
        if (typeof window !== "undefined") {
          localStorage.setItem("synapse_github_token", token);
        }
      }

      const result = await createPullRequest({
        sandboxId: sandbox.id,
        files,
        githubToken: token,
      });
      setPrUrl(result.prUrl);
    } catch (err) {
      console.error("Create/update PR failed:", err);
    } finally {
      setLoading(false);
    }
  }

  const displayUrl = prUrl ?? sandbox.prUrl;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Pull request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayUrl ? (
          <>
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="size-4" />
              {sandbox.prNumber != null ? `PR #${sandbox.prNumber}` : "Open PR"}
            </a>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleCreateOrUpdatePr}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>Update PR</>
              )}
            </Button>
          </>
        ) : (
          <Button
            className="w-full"
            onClick={handleCreateOrUpdatePr}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <GitPullRequest className="size-4 mr-2" />
                Create PR
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
