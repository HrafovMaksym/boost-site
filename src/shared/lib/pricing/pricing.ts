const FACEIT_OPTIONS = [
  "selfplay",
  "priority",
  "highRating",
  "moreBoosters",
  "superExpress",
  "premiumCoaching",
  "soloOnly",
  "offlineMode",
  "bringFriend",
  "premiumQue",
  "starBooster",
] as const;

const FACEIT_MULTIPLIERS: Record<(typeof FACEIT_OPTIONS)[number], number> = {
  selfplay: 0.4,
  priority: 0.15,
  highRating: 0.2,
  moreBoosters: 0.15,
  superExpress: 0.4,
  premiumCoaching: 0.8,
  soloOnly: 0.35,
  offlineMode: 0,
  bringFriend: 0.7,
  premiumQue: 0.7,
  starBooster: 0.4,
};

const PREMIERE_OPTIONS = [
  "partyBoost",
  "priority",
  "boostersAmount",
  "express",
  "coaching",
  "solo",
  "bringFriend",
  "rankedBooster",
] as const;

const PREMIERE_MULTIPLIERS: Record<
  (typeof PREMIERE_OPTIONS)[number],
  number
> = {
  partyBoost: 0.4,
  priority: 0.15,
  boostersAmount: 0.15,
  express: 0.4,
  coaching: 0.8,
  solo: 0.35,
  bringFriend: 0.7,
  rankedBooster: 0.4,
};

function getFaceitRate(elo: number): number {
  if (elo < 1000) return 0.05;
  if (elo < 1500) return 0.08;
  if (elo < 2000) return 0.15;
  if (elo < 2500) return 0.25 + (elo - 2000) * 0.0003;
  if (elo < 2700) return 0.481;
  if (elo < 3300) return 0.52 + (elo - 2700) * 0.00045;
  if (elo < 3500) return 0.7949;
  if (elo < 3700) return 1.0881;
  return 1.1267;
}

function getPremiereRate(rating: number): number {
  if (rating < 15000) return 0.01608;
  if (rating < 21000) return 0.01916;
  if (rating < 25000) return 0.02978;
  if (rating < 31000) return 0.04751;
  return 0.10295;
}

type ServiceType = "Faceit ELO Boost" | "CS2 Premiere Boost";

interface ValidatedOrder {
  service: ServiceType;
  currentValue: number;
  desiredValue: number;
  options: Record<string, boolean>;
  price: number;
}

export function validateAndCalculatePrice(body: unknown): ValidatedOrder {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const { service, currentValue, desiredValue, options } = body as Record<
    string,
    unknown
  >;

  if (service !== "Faceit ELO Boost" && service !== "CS2 Premiere Boost") {
    throw new Error("Invalid service type");
  }

  if (
    typeof currentValue !== "number" ||
    typeof desiredValue !== "number" ||
    !Number.isFinite(currentValue) ||
    !Number.isFinite(desiredValue) ||
    !Number.isInteger(currentValue) ||
    !Number.isInteger(desiredValue)
  ) {
    throw new Error("Values must be finite integers");
  }

  if (desiredValue <= currentValue) {
    throw new Error("Desired value must be greater than current value");
  }

  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new Error("Invalid options format");
  }

  const validatedOptions = options as Record<string, unknown>;
  for (const value of Object.values(validatedOptions)) {
    if (typeof value !== "boolean") {
      throw new Error("Option values must be booleans");
    }
  }

  if (service === "Faceit ELO Boost") {
    if (currentValue < 0 || currentValue > 5000) {
      throw new Error("Current ELO must be between 0 and 5000");
    }
    if (desiredValue - currentValue < 25 || desiredValue - currentValue > 1500) {
      throw new Error("ELO gain must be between 25 and 1500");
    }

    const optionKeys = Object.keys(validatedOptions);
    for (const key of optionKeys) {
      if (!FACEIT_OPTIONS.includes(key as (typeof FACEIT_OPTIONS)[number])) {
        throw new Error(`Invalid option: ${key}`);
      }
    }

    let basePrice = 0;
    for (let i = currentValue; i < desiredValue; i++) {
      basePrice += getFaceitRate(i);
    }

    let multiplier = 1;
    for (const key of optionKeys) {
      if (validatedOptions[key] === true) {
        multiplier +=
          FACEIT_MULTIPLIERS[key as (typeof FACEIT_OPTIONS)[number]];
      }
    }

    return {
      service,
      currentValue,
      desiredValue,
      options: validatedOptions as Record<string, boolean>,
      price: Number((basePrice * multiplier).toFixed(2)),
    };
  }

  if (currentValue < 0 || currentValue > 35000) {
    throw new Error("Current rating must be between 0 and 35000");
  }
  if (desiredValue - currentValue < 500 || desiredValue - currentValue > 10000) {
    throw new Error("Rating gain must be between 500 and 10000");
  }

  const optionKeys = Object.keys(validatedOptions);
  for (const key of optionKeys) {
    if (!PREMIERE_OPTIONS.includes(key as (typeof PREMIERE_OPTIONS)[number])) {
      throw new Error(`Invalid option: ${key}`);
    }
  }

  let basePrice = 0;
  for (let i = currentValue; i < desiredValue; i++) {
    basePrice += getPremiereRate(i);
  }

  let multiplier = 1;
  for (const key of optionKeys) {
    if (validatedOptions[key] === true) {
      multiplier +=
        PREMIERE_MULTIPLIERS[key as (typeof PREMIERE_OPTIONS)[number]];
    }
  }

  return {
    service,
    currentValue,
    desiredValue,
    options: validatedOptions as Record<string, boolean>,
    price: Number((basePrice * multiplier).toFixed(2)),
  };
}
