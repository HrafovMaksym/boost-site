import Link from "next/link";
import { Container, ButtonDefault } from "@/shared/ui";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-[var(--header-height)]">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="relative mb-8">
            <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter opacity-10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Oops! <span className="gradient-text">Lost</span>
              </h2>
            </div>
            <div className="absolute -inset-4 blur-3xl bg-accent-primary/20 -z-10 rounded-full animate-pulse" />
          </div>

          <p className="text-text-secondary text-lg mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Let&apos;s get you back on track.
          </p>

          <Link href="/">
            <ButtonDefault
              text="Return Home"
              leftIcon={<MoveLeft size={20} />}
              styles="px-8 py-4 text-lg w-full md:w-auto"
            />
          </Link>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-40">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
