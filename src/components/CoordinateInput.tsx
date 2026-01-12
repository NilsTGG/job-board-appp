import React from "react";

interface CoordinateInputProps {
  label: string;
  sublabel?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
  label,
  sublabel,
  name,
  value,
  onChange,
  required = false,
}) => {
  // Parse existing value into x, y, z
  const parts = value.split(",").map((s) => s.trim());
  const x = parts[0] || "";
  const y = parts[1] || "";
  const z = parts[2] || "";

  const updateCoord = (axis: "x" | "y" | "z", newValue: string) => {
    // Only allow numbers, minus sign, and empty
    const sanitized = newValue.replace(/[^0-9-]/g, "");

    let newX = x,
      newY = y,
      newZ = z;
    if (axis === "x") newX = sanitized;
    if (axis === "y") newY = sanitized;
    if (axis === "z") newZ = sanitized;

    // Combine back into comma-separated string
    onChange(`${newX}, ${newY}, ${newZ}`);
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-brand-surface border border-brand-border rounded-lg text-white text-center placeholder-brand-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div>
      <label className="block text-white font-medium mb-2">
        {label} {required && "*"}
        {sublabel && (
          <span className="text-xs text-brand-muted block font-normal mt-1">
            {sublabel}
          </span>
        )}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-brand-muted mb-1 block text-center">
            X
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="1234"
            value={x}
            onChange={(e) => updateCoord("x", e.target.value)}
            className={inputClass}
            aria-label={`${name} X coordinate`}
          />
        </div>
        <span className="text-brand-muted font-bold mt-5">,</span>
        <div className="flex-1">
          <label className="text-xs text-brand-muted mb-1 block text-center">
            Y
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="64"
            value={y}
            onChange={(e) => updateCoord("y", e.target.value)}
            className={inputClass}
            aria-label={`${name} Y coordinate`}
          />
        </div>
        <span className="text-brand-muted font-bold mt-5">,</span>
        <div className="flex-1">
          <label className="text-xs text-brand-muted mb-1 block text-center">
            Z
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="-5678"
            value={z}
            onChange={(e) => updateCoord("z", e.target.value)}
            className={inputClass}
            aria-label={`${name} Z coordinate`}
          />
        </div>
      </div>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default CoordinateInput;
