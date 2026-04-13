import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg-primary text-text-primary overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "var(--accent-primary)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "var(--accent-secondary)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4 py-16">{children}</div>
    </div>
  );
}
