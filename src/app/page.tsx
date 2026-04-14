import { HomePage } from "@/widgets/home-page/home-page";
import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[var(--header-height)]">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
