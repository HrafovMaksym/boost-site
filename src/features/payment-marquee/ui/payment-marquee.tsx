"use client";

import { cn } from "@/shared/lib/utils";
import { Marquee } from "@/shared/ui/marquee";
import { paymentMethods } from "../model/payment-methods";

const ReviewCard = ({ icon: Icon }: { icon: () => React.ReactNode }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-34  overflow-hidden rounded-xl border py-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "text-gray-500 dark:text-gray-300",
      )}
    >
      <Icon />
    </figure>
  );
};
export function PaymentMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:30s]">
        {paymentMethods.map((method) => (
          <ReviewCard key={method.name} icon={method.icon} />
        ))}
      </Marquee>

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
    </div>
  );
}
