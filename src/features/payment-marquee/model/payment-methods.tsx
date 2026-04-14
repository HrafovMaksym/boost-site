import type { ReactNode } from "react";

export interface PaymentMethod {
  name: string;
  icon: () => ReactNode;
}

function VisaIcon() {
  return (
    <svg
      viewBox="0 0 750 471"
      className="h-8 md:h-10 w-auto"
      fill="currentColor"
    >
      <path d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763H278.198zm246.11-191.54c-10.57-3.966-27.135-8.222-47.822-8.222-52.726 0-89.863 26.551-90.18 64.604-.636 28.124 26.524 43.801 46.754 53.164 20.771 9.578 27.752 15.716 27.652 24.267-.133 13.119-16.586 19.116-31.924 19.116-21.357 0-32.688-2.967-50.205-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.449 56.09 0 92.502-26.248 92.943-66.884.22-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.556-16.838 17.45-.271 30.088 3.534 39.936 7.5l4.781 2.259 7.232-42.494.156.098zm137.31-4.223h-41.23c-12.773 0-22.332 3.486-27.94 16.234l-79.245 179.404h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.528l-43.203-195.638zm-65.417 126.408c4.413-11.279 21.26-54.723 21.26-54.723-.317.534 4.381-11.335 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.529h-44.293zM209.092 138.465l-52.24 133.496-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.204 56.455-.063 84.004-195.39-56.523.002z" />
      <path
        d="M131.92 138.465H45.879l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.415l-18.709-89.96c-3.229-12.396-12.597-16.095-24.186-16.528z"
        opacity="0.7"
      />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg
      viewBox="0 0 256 199"
      className="h-8 md:h-10 w-auto"
      fill="currentColor"
    >
      <circle cx="96.6" cy="99.3" r="82" opacity="0.5" />
      <circle cx="159.4" cy="99.3" r="82" opacity="0.35" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg
      viewBox="0 0 140 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="28"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        PayPal
      </text>
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg
      viewBox="0 0 140 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="28"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        Apple Pay
      </text>
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="22"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        G Pay
      </text>
    </svg>
  );
}

function StripeIcon() {
  return (
    <svg
      viewBox="0 0 140 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="28"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        Stripe
      </text>
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg
      viewBox="0 0 140 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="28"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        AMEX
      </text>
    </svg>
  );
}

function KlarnaIcon() {
  return (
    <svg
      viewBox="0 0 140 40"
      className="h-full w-auto max-w-[100px]"
      fill="currentColor"
    >
      <text
        x="0"
        y="28"
        fontSize="28"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
      >
        Klarna
      </text>
    </svg>
  );
}

export const paymentMethods: PaymentMethod[] = [
  { name: "Visa", icon: VisaIcon },
  { name: "Mastercard", icon: MastercardIcon },
  { name: "PayPal", icon: PayPalIcon },
  { name: "Apple Pay", icon: ApplePayIcon },
  { name: "Google Pay", icon: GooglePayIcon },
  { name: "Stripe", icon: StripeIcon },
  { name: "American Express", icon: AmexIcon },
  { name: "Klarna", icon: KlarnaIcon },
];
