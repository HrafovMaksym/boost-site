import { Title, Description } from "@/shared/ui";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Title title="Your Orders" styles="text-3xl font-bold tracking-tight" />
        <Description description="Track and manage your boost orders." />
      </div>

      <div className="flex flex-col items-center justify-center py-24 bg-bg-secondary/30 border border-dashed border-border rounded-[var(--radius-xl)] text-center">
        <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-text-primary text-xl font-bold">No orders found yet</p>
        <p className="text-text-muted mt-2 max-w-xs">Visit our services page to start your first boost and reach your desired rank!</p>
      </div>
    </div>
  );
}
