"use client";

interface PriceSummaryProps {
  total: number;
  cashback: number;
  discount: number;
  nextTier?: { amount: number; discount: number };
  currency: string;
  estimatedTime: string;
  boosterAssignTime: string;
}

export function PriceSummary({
  total,
  cashback,
  discount,
  nextTier,
  currency,
  estimatedTime,
  boosterAssignTime,
}: PriceSummaryProps) {
  const progressPercent = nextTier
    ? Math.min(95, (total / (total + nextTier.amount)) * 100)
    : 100;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
            Total
          </span>
          <div className="text-3xl md:text-4xl font-bold gradient-text">
            {currency}
            {total.toFixed(2)}
          </div>
        </div>
        <div className="text-right">
          <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
            Cashback
          </span>
          <div className="text-lg font-semibold text-accent-secondary">
            {currency}
            {cashback.toFixed(2)}
          </div>
        </div>
      </div>

      {discount > 0 && (
        <div className="inline-block px-3 py-1 rounded-full bg-accent-primary/15 text-accent-primary text-xs font-medium">
          {discount}% discount applied
        </div>
      )}

      {nextTier && total > 0 && (
        <div>
          <div className="h-2 bg-bg-primary rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: "var(--accent-gradient)",
              }}
            />
          </div>
          <p className="text-text-muted text-xs">
            Add {currency}
            {nextTier.amount.toFixed(2)} more to get {nextTier.discount}%
            discount
          </p>
        </div>
      )}

      {total === 0 && (
        <p className="text-text-muted text-sm">
          Select a higher desired value to see pricing
        </p>
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-accent-primary/15 flex items-center justify-center text-xs">
            &#9201;
          </span>
          <span>Est. {estimatedTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-accent-secondary/15 flex items-center justify-center text-xs">
            &#9679;
          </span>
          <span>Booster in {boosterAssignTime}</span>
        </div>
      </div>
    </div>
  );
}
