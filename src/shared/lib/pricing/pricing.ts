const FACEIT_BOOLEAN_OPTIONS = [
  "selfplay",
  "priority",
  "highRating",
  "superExpress",
  "premiumCoaching",
  "soloOnly",
  "offlineMode",
  "premiumQue",
  "starBooster",
] as const;

const FACEIT_COUNTER_OPTIONS = ["moreBoosters", "bringFriend"] as const;

const FACEIT_MULTIPLIERS: Record<
  (typeof FACEIT_BOOLEAN_OPTIONS)[number],
  number
> = {
  selfplay: 0.4,
  priority: 0.15,
  highRating: 0.2,
  superExpress: 0.4,
  premiumCoaching: 0.8,
  soloOnly: 0.35,
  offlineMode: 0,
  premiumQue: 0.7,
  starBooster: 0.4,
};

const FACEIT_COUNTER_MULTIPLIERS: Record<
  (typeof FACEIT_COUNTER_OPTIONS)[number],
  { rate: number; max: number }
> = {
  moreBoosters: { rate: 0.15, max: 4 },
  bringFriend: { rate: 0.7, max: 3 },
};

const COACHING_VALID_MODES = ["demoReview", "coaching"] as const;

const COACHING_PRIORITY_MULTIPLIER = 0.2;

const COACHING_PRICES: Record<number, number> = {
  1: 21.49,
  2: 42.99,
  3: 62.49,
  4: 83.49,
  5: 102.49,
  6: 122.99,
  7: 140.49,
  8: 159.99,
  9: 174.99,
  10: 193.99,
  11: 213.49,
  12: 232.99,
  13: 246.99,
  14: 265.99,
  15: 284.99,
};

const PREMIERE_BOOLEAN_OPTIONS = [
  "selfplay",
  "priority",
  "express",
  "coaching",
  "solo",
  "rankedBooster",
] as const;

const PREMIERE_COUNTER_OPTIONS = ["boostersAmount", "bringFriend"] as const;

const PREMIERE_MULTIPLIERS: Record<
  (typeof PREMIERE_BOOLEAN_OPTIONS)[number],
  number
> = {
  selfplay: 0.4,
  priority: 0.15,
  express: 0.4,
  coaching: 0.8,
  solo: 0.35,
  rankedBooster: 0.4,
};

const PREMIERE_COUNTER_MULTIPLIERS: Record<
  (typeof PREMIERE_COUNTER_OPTIONS)[number],
  { rate: number; max: number }
> = {
  boostersAmount: { rate: 0.15, max: 4 },
  bringFriend: { rate: 0.7, max: 3 },
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

type ServiceType =
  | "Faceit ELO Boost"
  | "CS2 Premiere Boost"
  | "CS2 Pro Coaching";

interface ValidatedOrder {
  service: ServiceType;
  currentValue: number;
  desiredValue: number;
  options: Record<string, boolean | number | string>;
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

  if (
    service !== "Faceit ELO Boost" &&
    service !== "CS2 Premiere Boost" &&
    service !== "CS2 Pro Coaching"
  ) {
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

  if (service !== "CS2 Pro Coaching" && desiredValue <= currentValue) {
    throw new Error("Desired value must be greater than current value");
  }

  if (
    options === null ||
    typeof options !== "object" ||
    Array.isArray(options)
  ) {
    throw new Error("Invalid options format");
  }

  const validatedOptions = options as Record<string, unknown>;

  if (service === "CS2 Pro Coaching") {
    if (
      currentValue < 1 ||
      currentValue > 15 ||
      currentValue !== desiredValue
    ) {
      throw new Error("Sessions count must be between 1 and 15");
    }

    const allowedKeys = new Set(["priority", "mode"]);
    for (const key of Object.keys(validatedOptions)) {
      if (!allowedKeys.has(key)) {
        throw new Error(`Invalid option: ${key}`);
      }
    }

    if (
      validatedOptions.priority !== undefined &&
      typeof validatedOptions.priority !== "boolean"
    ) {
      throw new Error("priority must be a boolean");
    }

    if (
      typeof validatedOptions.mode !== "string" ||
      !COACHING_VALID_MODES.includes(
        validatedOptions.mode as (typeof COACHING_VALID_MODES)[number],
      )
    ) {
      throw new Error("mode must be 'demoReview' or 'coaching'");
    }

    const basePrice = COACHING_PRICES[currentValue];
    if (basePrice === undefined) {
      throw new Error("Invalid sessions count");
    }

    let multiplier = 1;
    if (validatedOptions.priority === true) {
      multiplier += COACHING_PRIORITY_MULTIPLIER;
    }

    return {
      service,
      currentValue,
      desiredValue,
      options: validatedOptions as Record<string, boolean | string>,
      price: Number((basePrice * multiplier).toFixed(2)),
    };
  }

  if (service === "Faceit ELO Boost") {
    if (currentValue < 0 || currentValue > 4000) {
      throw new Error("Current ELO must be between 0 and 4000");
    }
    if (desiredValue < 0 || desiredValue > 4000) {
      throw new Error("Desired ELO must be between 0 and 4000");
    }
    if (desiredValue - currentValue < 25) {
      throw new Error("ELO gain must be at least 25");
    }

    const optionKeys = Object.keys(validatedOptions);
    const allValidKeys = [
      ...FACEIT_BOOLEAN_OPTIONS,
      ...FACEIT_COUNTER_OPTIONS,
    ] as readonly string[];
    for (const key of optionKeys) {
      if (!allValidKeys.includes(key)) {
        throw new Error(`Invalid option: ${key}`);
      }
    }

    for (const key of optionKeys) {
      const val = validatedOptions[key];
      if (
        FACEIT_COUNTER_OPTIONS.includes(
          key as (typeof FACEIT_COUNTER_OPTIONS)[number],
        )
      ) {
        if (typeof val !== "number" || !Number.isInteger(val) || val < 0) {
          throw new Error(`${key} must be a non-negative integer`);
        }
        const cfg =
          FACEIT_COUNTER_MULTIPLIERS[
            key as (typeof FACEIT_COUNTER_OPTIONS)[number]
          ];
        if (val > cfg.max) {
          throw new Error(`${key} cannot exceed ${cfg.max}`);
        }
      } else {
        if (typeof val !== "boolean") {
          throw new Error(`${key} must be a boolean`);
        }
      }
    }

    const opts = validatedOptions as Record<string, boolean | number>;
    if (opts.selfplay && opts.soloOnly) {
      throw new Error("Self Play and Solo Only cannot be combined");
    }
    if (opts.highRating && opts.soloOnly) {
      throw new Error("High Rating and Solo Only cannot be combined");
    }
    if (opts.soloOnly && (opts.moreBoosters as number) > 0) {
      throw new Error("Solo Only and Add Boosters cannot be combined");
    }
    if (!opts.selfplay && (opts.bringFriend as number) > 0) {
      throw new Error("Bring Friend requires Self Play");
    }

    if (opts.highRating && opts.selfplay && desiredValue > 3000) {
      throw new Error("High Rating + Self Play limits max ELO to 3000");
    }
    if (
      opts.selfplay &&
      (opts.moreBoosters as number) + (opts.bringFriend as number) > 3
    ) {
      throw new Error("Lobby cannot exceed 5 players");
    }

    let basePrice = 0;
    for (let i = currentValue; i < desiredValue; i++) {
      basePrice += getFaceitRate(i);
    }

    let multiplier = 1;
    for (const key of FACEIT_BOOLEAN_OPTIONS) {
      if (opts[key] === true) {
        multiplier += FACEIT_MULTIPLIERS[key];
      }
    }
    for (const key of FACEIT_COUNTER_OPTIONS) {
      const count = (opts[key] as number) || 0;
      multiplier += FACEIT_COUNTER_MULTIPLIERS[key].rate * count;
    }

    return {
      service,
      currentValue,
      desiredValue,
      options: opts,
      price: Number((basePrice * multiplier).toFixed(2)),
    };
  }

  // CS2 Premiere Boost
  if (currentValue < 0 || currentValue > 30000) {
    throw new Error("Current rating must be between 0 and 30000");
  }
  if (desiredValue < 0 || desiredValue > 30000) {
    throw new Error("Desired rating must be between 0 and 30000");
  }
  if (desiredValue - currentValue < 500) {
    throw new Error("Rating gain must be at least 500");
  }

  const optionKeys = Object.keys(validatedOptions);
  const allPremiereKeys = [
    ...PREMIERE_BOOLEAN_OPTIONS,
    ...PREMIERE_COUNTER_OPTIONS,
  ] as readonly string[];
  for (const key of optionKeys) {
    if (!allPremiereKeys.includes(key)) {
      throw new Error(`Invalid option: ${key}`);
    }
  }

  for (const key of optionKeys) {
    const val = validatedOptions[key];
    if (
      PREMIERE_COUNTER_OPTIONS.includes(
        key as (typeof PREMIERE_COUNTER_OPTIONS)[number],
      )
    ) {
      if (typeof val !== "number" || !Number.isInteger(val) || val < 0) {
        throw new Error(`${key} must be a non-negative integer`);
      }
      const cfg =
        PREMIERE_COUNTER_MULTIPLIERS[
          key as (typeof PREMIERE_COUNTER_OPTIONS)[number]
        ];
      if (val > cfg.max) {
        throw new Error(`${key} cannot exceed ${cfg.max}`);
      }
    } else {
      if (typeof val !== "boolean") {
        throw new Error(`${key} must be a boolean`);
      }
    }
  }

  const opts = validatedOptions as Record<string, boolean | number>;
  if (opts.selfplay && opts.solo) {
    throw new Error("Self Play and Solo Only cannot be combined");
  }
  if (!opts.selfplay && (opts.bringFriend as number) > 0) {
    throw new Error("Bring Friend requires Self Play");
  }
  if (
    opts.selfplay &&
    (opts.boostersAmount as number) + (opts.bringFriend as number) > 3
  ) {
    throw new Error("Lobby cannot exceed 5 players");
  }

  let basePrice = 0;
  for (let i = currentValue; i < desiredValue; i++) {
    basePrice += getPremiereRate(i);
  }

  let multiplier = 1;
  for (const key of PREMIERE_BOOLEAN_OPTIONS) {
    if (opts[key] === true) {
      multiplier += PREMIERE_MULTIPLIERS[key];
    }
  }
  for (const key of PREMIERE_COUNTER_OPTIONS) {
    const count = (opts[key] as number) || 0;
    multiplier += PREMIERE_COUNTER_MULTIPLIERS[key].rate * count;
  }

  return {
    service,
    currentValue,
    desiredValue,
    options: opts,
    price: Number((basePrice * multiplier).toFixed(2)),
  };
}
