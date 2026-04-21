import { redirect } from "next/navigation";
import { verifyCheckoutSession } from "@/shared/server-actions/verify-checkout";
import { CheckCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Container } from "@/shared/ui";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -28.5 256 256"
      preserveAspectRatio="xMidYMid"
      className={className}
      fill="currentColor"
    >
      <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193a161.094 161.094 0 0 0 13.915-22.573 136.208 136.208 0 0 1-21.899-10.539c1.832-1.343 3.625-2.747 5.357-4.193 42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.358 4.193 136.066 136.066 0 0 1-21.92 10.56c4.052 8.02 8.604 15.71 13.916 22.573 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.825 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.825 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
    </svg>
  );
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/cs2/faceit");

  const isValid = await verifyCheckoutSession(session_id);
  if (!isValid) redirect("/cs2/faceit");

  return (
    <section className="min-h-[calc(100vh-var(--header-height))] flex items-center py-14 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "var(--accent-primary)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]"
          style={{ background: "var(--accent-secondary)" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full opacity-6 blur-[100px]"
          style={{ background: "#5865F2" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-bg-card to-[var(--accent-secondary)]/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_60%)]" />

            <div className="absolute top-6 right-10 w-2 h-2 rounded-full bg-accent-primary/40 animate-pulse" />
            <div className="absolute top-14 right-24 w-1.5 h-1.5 rounded-full bg-accent-secondary/30 animate-pulse [animation-delay:1s]" />
            <div className="absolute bottom-8 left-10 w-2 h-2 rounded-full bg-[#5865F2]/30 animate-pulse [animation-delay:0.5s]" />

            <div className="relative z-10">
              <div className="px-8 pt-12 pb-10 text-center border-b border-border">
                <div className="relative inline-flex mb-6">
                  <div
                    className="absolute inset-0 rounded-full blur-xl scale-150"
                    style={{ background: "rgba(34, 197, 94, 0.15)" }}
                  />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.25)]">
                    <CheckCircle
                      size={40}
                      className="text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
                  Payment <span className="gradient-text">Successful</span>
                </h1>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                  Your boost order has been confirmed. Our team will start
                  working on it shortly.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 bg-bg-elevated border border-border rounded-full px-4 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-text-muted font-medium">
                    Payment verified
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-5">
                <div className="rounded-[var(--radius-lg)] border border-[#5865F2]/25 bg-bg-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/8 to-transparent" />
                  <div className="relative z-10 p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#5865F2]/15 blur-lg scale-125" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center shadow-[0_0_30px_rgba(88,101,242,0.3)]">
                          <DiscordIcon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                      Join Our <span className="text-[#5865F2]">Discord</span>
                    </h2>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-5 max-w-xs mx-auto">
                      Connect with your booster, and get instant support from
                      our team.
                    </p>

                    <a
                      href="https://discord.gg/6ZzycFAbRr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-sm py-4 rounded-[var(--radius-md)] transition-all duration-300 shadow-[0_0_30px_rgba(88,101,242,0.25)] hover:shadow-[0_0_50px_rgba(88,101,242,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      <DiscordIcon className="w-5 h-5" />
                      Join Discord Server
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <Link
                  href="/profile/orders"
                  className="w-full flex items-center justify-center gap-2 bg-bg-card hover:bg-bg-card-hover border border-border hover:border-border-hover text-text-primary font-semibold text-sm py-3.5 rounded-[var(--radius-md)] transition-all active:scale-[0.98]"
                >
                  View My Orders
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/"
                  className="w-full flex items-center justify-center text-text-muted hover:text-text-secondary text-xs font-medium py-2 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
