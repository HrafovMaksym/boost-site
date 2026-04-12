"use client";

import { useState, useMemo } from "react";
import type { OrderFormConfig } from "./types";
import { Tabs } from "./components/Tabs";
import { RangeInput } from "./components/RangeInput";
import { OptionsGrid } from "./components/OptionsGrid";
import { PriceSummary } from "./components/PriceSummary";
import { ExtraSections } from "./components/ExtraSections";
import { Button } from "@/shared/ui";

interface OrderFormProps {
  config: OrderFormConfig;
}

export function OrderForm({ config }: OrderFormProps) {
  const [activeTab, setActiveTab] = useState(config.tabs?.[0]?.id ?? "");
  const [currentValue, setCurrentValue] = useState(
    config.currentValue.defaultValue,
  );
  const [desiredValue, setDesiredValue] = useState(
    config.desiredValue.defaultValue,
  );
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [extraValues, setExtraValues] = useState<
    Record<string, string | boolean>
  >(() => {
    const defaults: Record<string, string | boolean> = {};
    config.extraSections?.forEach((section) => {
      if (section.defaultValue !== undefined) {
        defaults[section.id] = section.defaultValue;
      } else if (section.type === "select" && section.options?.[0]) {
        defaults[section.id] = section.options[0].value;
      } else if (section.type === "toggle") {
        defaults[section.id] = false;
      }
    });
    return defaults;
  });

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const changeQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const changeExtra = (id: string, value: string | boolean) => {
    setExtraValues((prev) => ({ ...prev, [id]: value }));
  };

  const pricing = useMemo(() => {
    const diff = Math.max(0, desiredValue - currentValue);
    let basePrice = diff * config.basePricePerUnit;

    for (const option of config.options) {
      if (selectedOptions[option.id]) {
        if (option.modifierType === "percentage") {
          basePrice *= 1 + option.priceModifier / 100;
        } else {
          let flatAmount = option.priceModifier;
          if (option.hasQuantity) {
            flatAmount *= quantities[option.id] ?? option.quantityDefault ?? 1;
          }
          basePrice += flatAmount;
        }
      }
    }

    let discount = 0;
    let nextTier: { amount: number; discount: number } | undefined;
    const sortedTiers = [...config.discountTiers].sort(
      (a, b) => a.threshold - b.threshold,
    );

    for (let i = 0; i < sortedTiers.length; i++) {
      if (basePrice >= sortedTiers[i].threshold) {
        discount = sortedTiers[i].discount;
      } else {
        nextTier = {
          amount:
            Math.round((sortedTiers[i].threshold - basePrice) * 100) / 100,
          discount: sortedTiers[i].discount,
        };
        break;
      }
    }

    const total = Math.round(basePrice * (1 - discount / 100) * 100) / 100;
    const cashback =
      Math.round(total * (config.cashbackPercent / 100) * 100) / 100;

    return { total, cashback, discount, nextTier };
  }, [currentValue, desiredValue, selectedOptions, quantities, config]);

  return (
    <div className="rounded-[var(--radius-lg)] bg-bg-card border border-border p-6 md:p-8 space-y-6 shadow-[var(--shadow-card)]">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-text-primary">
        {config.title}
      </h2>

      {/* Tabs */}
      {config.tabs && config.tabs.length > 0 && (
        <Tabs
          tabs={config.tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      )}

      {/* Range inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RangeInput
          label={config.currentValue.label}
          value={currentValue}
          min={config.currentValue.min}
          max={config.currentValue.max}
          step={config.currentValue.step}
          onChange={setCurrentValue}
          formatValue={config.currentValue.formatValue}
        />
        <RangeInput
          label={config.desiredValue.label}
          value={desiredValue}
          min={config.desiredValue.min}
          max={config.desiredValue.max}
          step={config.desiredValue.step}
          onChange={setDesiredValue}
          formatValue={config.desiredValue.formatValue}
        />
      </div>

      {/* Options */}
      <OptionsGrid
        options={config.options}
        selected={selectedOptions}
        quantities={quantities}
        currency={config.currency}
        onToggle={toggleOption}
        onQuantityChange={changeQuantity}
      />

      {/* Extra sections */}
      {config.extraSections && config.extraSections.length > 0 && (
        <ExtraSections
          sections={config.extraSections}
          values={extraValues}
          onChange={changeExtra}
        />
      )}

      {/* Price summary */}
      <div className="border-t border-border pt-6">
        <PriceSummary
          total={pricing.total}
          cashback={pricing.cashback}
          discount={pricing.discount}
          nextTier={pricing.nextTier}
          currency={config.currency}
          estimatedTime={config.estimatedTime}
          boosterAssignTime={config.boosterAssignTime}
        />
      </div>

      {/* Auth buttons */}
      <div className="flex gap-3 pt-2">
        <Button href="/login" variant="primary" fullWidth>
          Log In
        </Button>
        <Button href="/register" variant="outline" fullWidth>
          Register
        </Button>
      </div>
    </div>
  );
}
