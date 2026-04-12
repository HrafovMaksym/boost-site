export interface TabConfig {
  id: string;
  label: string;
}

export interface RangeInputConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  formatValue?: (value: number) => string;
}

export interface OptionConfig {
  id: string;
  label: string;
  tooltip?: string;
  priceModifier: number;
  modifierType: "percentage" | "flat";
  hasQuantity?: boolean;
  quantityMin?: number;
  quantityMax?: number;
  quantityDefault?: number;
  quantityLabel?: string;
}

export interface ExtraSectionConfig {
  id: string;
  type: "select" | "toggle";
  label: string;
  tooltip?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | boolean;
}

export interface DiscountTier {
  threshold: number;
  discount: number;
}

export interface OrderFormConfig {
  title: string;
  tabs?: TabConfig[];
  currentValue: RangeInputConfig;
  desiredValue: RangeInputConfig;
  options: OptionConfig[];
  extraSections?: ExtraSectionConfig[];
  currency: string;
  basePricePerUnit: number;
  cashbackPercent: number;
  discountTiers: DiscountTier[];
  estimatedTime: string;
  boosterAssignTime: string;
}
