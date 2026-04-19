import { redirect } from "next/navigation";
import { verifyCheckoutSession } from "@/shared/server-actions/verify-checkout";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

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

  if (!session_id) redirect("/");

  const isValid = await verifyCheckoutSession(session_id);
  if (!isValid) redirect("/");

  return (
    <div className="min-h-screen bg-[#070a10] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#5865F2]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-[#0b0e16] border border-[#1f2330] rounded-[32px] overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/5 p-10 text-center border-b border-[#1f2330]">
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-150" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <CheckCircle
                  size={40}
                  className="text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
              Payment Successful
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              Your boost order has been confirmed. Our team will start working on
              it shortly.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-[#161b28] border border-[#2d3446] rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-mono">
                Session confirmed
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5865F2] to-[#4752C4] rounded-[20px] blur opacity-20" />
              <div className="relative bg-[#161b28] border border-[#5865F2]/30 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                    <DiscordIcon className="w-7 h-7 text-[#5865F2]" />
                  </div>
                </div>

                <h2 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                  Join Our Discord
                </h2>
                <p className="text-gray-400 text-xs leading-relaxed mb-5 max-w-xs mx-auto">
                  Connect with your booster, track progress in real-time, and
                  get instant support from our team.
                </p>

                <a
                  href="https://discord.gg/ajT7qf2YNN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black uppercase tracking-tight text-sm py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(88,101,242,0.25)] hover:shadow-[0_0_50px_rgba(88,101,242,0.4)] active:scale-95"
                >
                  <DiscordIcon className="w-5 h-5" />
                  Join Discord Server
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/profile/orders"
                className="w-full flex items-center justify-center gap-2 bg-[#161b28] hover:bg-[#1c2234] border border-[#2d3446] text-white font-bold text-xs uppercase tracking-tight py-3.5 rounded-xl transition-all active:scale-95"
              >
                View My Orders
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/"
                className="w-full flex items-center justify-center text-gray-500 hover:text-gray-300 text-xs font-medium py-2 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
