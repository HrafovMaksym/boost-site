import { Container, FadeIn } from "@/shared/ui";

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

export function DiscordCTA() {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "#5865F2" }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]"
          style={{ background: "var(--accent-secondary)" }}
        />
      </div>

      <Container className="relative z-10">
        <FadeIn duration={0.6}>
          <div className="relative rounded-[var(--radius-xl)] border border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/10 via-bg-card to-[#06b6d4]/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(88,101,242,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.08),transparent_60%)]" />

            <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-[#5865F2]/40 animate-pulse" />
            <div className="absolute top-16 right-28 w-1.5 h-1.5 rounded-full bg-accent-secondary/30 animate-pulse [animation-delay:1s]" />
            <div className="absolute bottom-10 left-16 w-2 h-2 rounded-full bg-[#5865F2]/30 animate-pulse [animation-delay:0.5s]" />
            <div className="absolute bottom-20 left-40 w-1 h-1 rounded-full bg-accent-secondary/40 animate-pulse [animation-delay:1.5s]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-8 py-12 md:px-14 md:py-16">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#5865F2]/20 blur-xl scale-125" />
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center shadow-[0_0_40px_rgba(88,101,242,0.35)]">
                    <DiscordIcon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                  Join Our <span className="text-[#5865F2]">Community</span>
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Have questions or need help? Connect with our admins, chat
                  with other players, get exclusive deals, and stay updated —
                  all in our Discord server.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <a
                    href="https://discord.gg/2Dn9MHMSVW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    inline-flex items-center justify-center gap-3
                    px-8 py-4 text-lg font-semibold text-white
                    bg-[#5865F2] hover:bg-[#4752C4]
                    rounded-full transition-all duration-300
                    shadow-[0_0_30px_rgba(88,101,242,0.3)]
                    hover:shadow-[0_0_50px_rgba(88,101,242,0.5)]
                    hover:-translate-y-0.5
                    cursor-pointer select-none
                  "
                  >
                    <DiscordIcon className="w-5 h-5" />
                    Join Discord
                  </a>
                  {/* <span className="text-text-muted text-sm">
                    2,000+ members online
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
