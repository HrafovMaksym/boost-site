"use client";

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: RangeInputProps) {
  const display = formatValue ? formatValue(value) : value.toLocaleString();

  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value.replace(/\D/g, ""), 10);
    if (isNaN(raw)) return;
    const clamped = Math.max(min, Math.min(max, raw));
    const snapped = Math.round(clamped / step) * step;
    onChange(snapped);
  };

  return (
    <div className="p-5 rounded-[var(--radius-md)] bg-bg-primary/60 border border-border">
      <label className="text-text-secondary text-sm mb-4 block font-medium">
        {label}
      </label>
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-[var(--radius-sm)] bg-bg-card border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-primary transition-colors flex items-center justify-center text-lg font-medium shrink-0"
        >
          &minus;
        </button>

        {formatValue ? (
          <span className="text-xl md:text-2xl font-bold text-text-primary text-center flex-1 truncate">
            {display}
          </span>
        ) : (
          <input
            type="text"
            value={display}
            onChange={handleInputChange}
            className="text-xl md:text-2xl font-bold text-text-primary text-center bg-transparent w-full outline-none flex-1 min-w-0"
          />
        )}

        <button
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 rounded-[var(--radius-sm)] bg-bg-card border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-primary transition-colors flex items-center justify-center text-lg font-medium shrink-0"
        >
          +
        </button>
      </div>
    </div>
  );
}
