import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[var(--header-height)]">{children}</main>
      <Footer />
    </>
  );
}
