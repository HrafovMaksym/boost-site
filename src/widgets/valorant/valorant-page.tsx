// "use client";
// import { Container, SectionTitle } from "@/shared/ui";
// import { GAMES } from "@/entities/games";
// import { HeroSection } from "@/features/hero-section/ui/hero-section";
// import { ServiceCard } from "@/features/service-card/ui/service-card";
// import { FeaturesSection } from "@/features/features-section/ui/features-section";
// import { OrderForm } from "@/features/order-form/order-form";
// import { VALORANT_RANK_CONFIG } from "@/features/order-form/configs";

// export function ValorantPage() {
//   const valorant = GAMES.find((g) => g.slug === "valorant")!;

//   return (
//     <>
//       <HeroSection
//         title="Valorant"
//         gradientTitle="Boosting"
//         subtitle={valorant.description}
//         ctaText="Configure Boost"
//         ctaHref="#order"
//         secondaryCtaText="Back to Home"
//         secondaryCtaHref="/"
//       />

//       <section id="services" className="py-20 md:py-28 bg-bg-secondary">
//         <Container>
//           <SectionTitle
//             title="Valorant Services"
//             subtitle="Professional rank boosting, placement matches, and win boost services."
//           />

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {valorant.services.map((service) => (
//               <ServiceCard key={service.title} service={service} />
//             ))}
//           </div>
//         </Container>
//       </section>

//       <section id="order" className="py-20 md:py-28">
//         <Container>
//           <SectionTitle
//             title="Configure Your Boost"
//             subtitle="Select your current and desired rank to get started."
//           />
//           <div className="max-w-3xl mx-auto">
//             <OrderForm config={VALORANT_RANK_CONFIG} />
//           </div>
//         </Container>
//       </section>

//       <FeaturesSection />
//     </>
//   );
// }
