import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";
import { Container } from "@/shared/ui";
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar";
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/model/actions";

export const dynamic = "force-dynamic";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-20 min-h-screen">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6">
            <ProfileSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
