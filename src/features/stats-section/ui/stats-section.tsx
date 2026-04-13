import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/entities/games";

const stats = [
  { value: SITE_CONFIG.stats.ordersCompleted, label: "Orders Completed" },
  { value: SITE_CONFIG.stats.happyCustomers, label: "Happy Customers" },
  { value: SITE_CONFIG.stats.averageRating, label: "Average Rating" },
  { value: SITE_CONFIG.stats.proPlayers, label: "Pro Players" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 border-y border-border bg-bg-secondary">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
