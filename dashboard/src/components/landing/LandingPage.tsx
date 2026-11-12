"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  Mic,
  Sparkles,
  Layers,
  Zap,
  Smile,
  MousePointer,
  GitPullRequest,
  Code2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Users,
  Laptop,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInDialog } from "@/components/SignInDialog";
import { Magnetic } from "@/components/ui/magnetic";
import { BorderTrail } from "../../../components/motion-primitives/border-trail";

const SYNAPSE_PATH =
  "M547.596558,142.588333 C542.816101,139.088135 539.528931,139.961685 535.398499,143.902679 C505.876587,172.070709 476.074402,199.945389 446.289398,227.836517 C444.050140,229.933395 443.162445,231.739395 444.580048,234.712097 C446.379822,238.486252 447.470978,242.569702 447.381409,246.787018 C447.284851,251.333038 449.774353,253.056747 453.778961,254.184998 C475.076447,260.185303 496.323700,266.364075 517.579224,272.512756 C534.844971,277.507294 552.096130,282.552094 569.357666,287.561188 C572.865112,288.579010 576.396179,289.515411 579.904907,290.528839 C582.688416,291.332825 584.471069,290.344757 586.253418,288.033112 C596.874939,274.257477 611.171875,268.451172 628.074707,271.496674 C645.434631,274.624512 657.406616,285.071381 661.381836,302.663666 C668.686157,334.988403 640.941711,358.035522 614.534607,353.845215 C609.369324,353.025635 604.396057,351.698120 599.961487,348.983429 C597.266907,347.333862 595.512878,347.936920 593.443665,349.915710 C581.047546,361.770233 568.575928,373.545746 556.130005,385.348114 C539.214661,401.388824 522.341492,417.474457 505.343414,433.426910 C502.496368,436.098816 502.034332,438.349579 503.588226,442.116028 C512.899048,464.684357 503.876404,488.278564 482.319061,498.588593 C461.453308,508.567932 436.273773,500.682495 425.179626,480.694427 C411.165680,455.445770 425.187012,423.389160 453.407745,417.309357 C463.574585,415.119019 474.072540,415.777100 483.576233,420.978851 C486.529480,422.595306 488.298889,421.941284 490.503204,419.837036 C520.385620,391.310974 550.320679,362.839966 580.281921,334.396606 C582.037781,332.729706 582.918335,331.276550 581.724426,328.794525 C579.760803,324.712402 578.901001,320.260529 578.409119,315.782196 C578.079041,312.777161 576.805969,311.078918 573.744873,310.201202 C544.790894,301.899567 515.870056,293.481842 486.946838,285.073181 C473.998047,281.308716 461.027130,277.612518 448.146637,273.625519 C443.787689,272.276276 441.057037,272.883545 438.116211,276.820618 C427.647308,290.835999 407.797363,296.021942 390.859253,289.721069 C372.826843,283.013184 362.750885,267.158630 363.721497,247.019745 C364.507416,230.712982 377.290619,215.621902 393.604614,210.750610 C404.875946,207.385056 415.387421,209.057114 425.539429,214.046921 C428.748749,215.624329 430.473511,215.032227 432.863251,212.773544 C463.129150,184.167282 493.473511,155.643829 523.864624,127.170517 C526.098022,125.078041 526.785767,123.355469 525.546143,120.287560 C513.365479,90.142624 532.448364,59.503624 564.780640,57.077938 C587.330994,55.386127 607.979675,72.538727 611.769287,96.110840 C615.240356,117.701546 600.003235,140.221039 578.666016,145.493652 C568.014343,148.125748 557.881775,146.996094 547.596558,142.588333z";

function DecorativeLogo({
  className,
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 544"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      <path fill="currentColor" d={SYNAPSE_PATH} />
    </svg>
  );
}

export function LandingPage() {
  const pathname = usePathname();
  const [signInOpen, setSignInOpen] = useState(false);

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center bg-linear-to-b from-background via-background to-muted/30 overflow-x-hidden">
      {/* ── Decorative Background Logos ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <DecorativeLogo
          className="absolute -left-[10%] top-[4%] w-[min(90vmax,28rem)] h-auto text-foreground opacity-[0.06]"
          ariaHidden
        />
        <DecorativeLogo
          className="absolute top-[35%] -right-[15%] w-[min(90vmax,32rem)] h-auto text-foreground opacity-[0.05]"
          ariaHidden
        />
        <DecorativeLogo
          className="absolute bottom-[10%] -left-[20%] w-[min(90vmax,32rem)] h-auto text-foreground opacity-[0.04]"
          ariaHidden
        />
      </div>

      {/* ── Hero Section ── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 flex flex-col items-center">
        <div className="text-center space-y-6 animate-landing-entry opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur-md text-xs text-muted-foreground shadow-xs mb-2">
            <span className="flex size-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Autonomous UI/UX Feedback & Voice Iteration</span>
          </div>

          <h1
            className="text-4xl font-bold tracking-tight leading-snug text-foreground sm:text-5xl md:text-6xl"
            style={{
              filter:
                "drop-shadow(0 0 8px color-mix(in oklch, var(--primary) 60%, transparent)) drop-shadow(0 0 20px color-mix(in oklch, var(--primary) 35%, transparent)) drop-shadow(0 0 40px color-mix(in oklch, var(--primary) 15%, transparent))",
            }}
          >
            The most{" "}
            <span className="relative inline-block">
              complete
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[0.22em] bg-orange-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4,
                }}
                style={{ transformOrigin: "left" }}
              />
            </span>{" "}
            UI/UX feedback loop ever.
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto sm:text-xl leading-relaxed">
            Turn user voice, emotions, clicks, and intent into live sandbox code
            edits and automatic, review-ready GitHub Pull Requests.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic intensity={0.4} range={320}>
              <Button
                size="lg"
                className="text-base px-8 h-12 shadow-md cursor-pointer"
                onClick={() => setSignInOpen(true)}
              >
                Get Started Free
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* ── Interactive Workflow Visual Card (Replaces video) ── */}
        <div
          className="relative mt-14 w-full max-w-4xl rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-xl overflow-hidden p-6 sm:p-8 animate-landing-entry opacity-0"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none rounded-[inherit]">
            <BorderTrail
              className="bg-primary/80"
              size={120}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
          </div>

          <div className="relative z-20 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  synopsis-sandbox / live-preview
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                AI Agent Active
              </div>
            </div>

            {/* Step-by-Step Flow Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1: Voice Input */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mic className="size-3.5 text-orange-500" /> 1. Voice Prompt
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">Audio In</span>
                </div>
                <p className="text-sm font-medium text-foreground bg-card/60 p-2.5 rounded-lg border border-border/60">
                  &ldquo;Make the hero title larger and change the button to dark teal.&rdquo;
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Transcribed in real time via Web Speech API
                </span>
              </div>

              {/* Step 2: Autonomous Agent Action */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-500" /> 2. AI Code Update
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">1.2s</span>
                </div>
                <div className="text-xs font-mono bg-zinc-950 text-emerald-400 p-2.5 rounded-lg border border-border/60 overflow-hidden leading-relaxed">
                  <div>+ style.css: --brand: #0E6B63</div>
                  <div>+ index.html: h1 font-size: 3.5rem</div>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Hot-reloaded in sandbox storage
                </span>
              </div>

              {/* Step 3: Git PR Output */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <GitPullRequest className="size-3.5 text-purple-500" /> 3. GitHub PR
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">Ready</span>
                </div>
                <div className="text-xs bg-card/60 p-2.5 rounded-lg border border-border/60 flex items-center justify-between">
                  <span className="font-semibold text-foreground">PR #12: Hero update</span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    Open
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Includes full telemetry changelog
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: What is Synopsis / How It Works ── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto py-16 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-orange-500">
            How It Works
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From Spoken Feedback to Merged Code in 3 Simple Steps
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            No tedious bug reports, screen recordings, or endless Slack threads.
            Synopsis closes the gap between product feedback and engineering execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mb-4">
              1
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Connect Any Web Repository
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Link your GitHub repository or start with instant templates. Synopsis
              deploys an isolated live sandbox in seconds without Docker or GPU setup.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold mb-4">
              2
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Speak or Test Naturally
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Testers use voice or text to explain what needs changing. The autonomous
              code agent immediately writes and previews the updates live.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold mb-4">
              3
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              One-Click Pull Requests
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every accepted change is packaged into a clean Git branch with automated
              change descriptions, ready for review and merge into production.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: Platform Features & Offerings ── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto py-16 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
            Platform Capabilities
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Perfect Your User Experience
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Equipped with intelligent voice assistants, behavioral analytics, and automated
            version control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Mic className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Speech-to-Code Agent
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Speak your instructions. The AI agent analyzes speech, extracts actionable
              developer directives, and modifies your app&apos;s code in real time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Layers className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Zero-Config Sandboxes
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instant, secure sandbox environments backed by fast local storage.
              Test multi-page static websites and apps without container overhead.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
              <Smile className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Emotion & Sentiment Telemetry
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Integrated Hume AI tracks user sentiment, smiles, and frustration points
              while testing, letting you identify usability friction before launch.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <MousePointer className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Cursor & Interaction Tracking
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Capture velocity, pauses, and click paths. Visual telemetry helps you
              understand exactly where users hesitate on your pages.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <GitPullRequest className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Automated Pull Requests
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Export edited files directly to GitHub branches with a single click.
              PR descriptions are populated with session changelogs automatically.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="size-9 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h4 className="text-base font-semibold text-foreground">
              Context Memory & Session History
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Persistent session memory remembers past user edits and architectural
              rules, ensuring coherent changes across multi-turn testing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: Who is it for? ── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto py-16 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-orange-500">
            Tailored Solutions
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Modern Web Teams
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Whether you&apos;re validating an early prototype or refining a high-traffic web product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="size-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Laptop className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">
                Founders & Product Managers
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Run user interviews and watch feedback convert into working code in front of
                your eyes without waiting for engineer sprint cycles.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Code2 className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">
                Frontend Developers
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Skip manually deciphering ambiguous bug reports. Receive clean,
                ready-to-review Pull Requests with live tested variations.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="size-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Users className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">
                UX Designers & Researchers
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Back your design decisions with objective emotional telemetry and
                cursor data, rather than subjective post-session surveys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Comparison / Why Synopsis ── */}
      <section className="relative z-10 w-full max-w-4xl mx-auto py-12 px-4">
        <div className="rounded-2xl border border-border bg-muted/30 p-8">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            The Traditional Way vs. The Synopsis Way
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 rounded-xl border border-border bg-card/40">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <X className="size-4 text-red-500" /> Traditional Feedback
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  Hours reviewing Loom videos and taking notes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  Vague descriptions like &ldquo;the button looks weird&rdquo;
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  Days of back-and-forth creating tickets and coding
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No objective measure of tester frustration
                </li>
              </ul>
            </div>

            <div className="space-y-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="size-4 text-emerald-500" /> The Synopsis Way
              </h4>
              <ul className="space-y-2 text-xs text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Testers speak and changes happen in 2 seconds
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  AI turns spoken voice into clean, structured code
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Real-time facial & emotion telemetry tracks delight
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  One-click Pull Request with changelog ready to merge
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ── */}
      <section className="relative z-10 w-full max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="rounded-3xl border border-border bg-linear-to-b from-card to-muted/40 p-8 sm:p-12 shadow-lg space-y-6">
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start Polishing Your User Experience Today
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Experience the future of UI/UX iteration. No credit card required,
            free tier available for demo and development.
          </p>
          <div className="pt-2">
            <Magnetic intensity={0.4} range={300}>
              <Button
                size="lg"
                className="text-base px-8 h-12 shadow-md cursor-pointer"
                onClick={() => setSignInOpen(true)}
              >
                Launch Your First Sandbox
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ── Minimal Footer ── */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <DecorativeLogo className="size-6 text-foreground" ariaHidden />
          <span className="font-semibold text-foreground">Synopsis</span>
          <span>&mdash; Autonomous UX Testing Platform</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Synopsis. All rights reserved.</p>
      </footer>

      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        callbackURL="/"
        dismissible
      />
    </div>
  );
}
