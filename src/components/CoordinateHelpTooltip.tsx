import React, { useState } from "react";
import { HelpCircle, X, Copy, Check } from "lucide-react";

interface CoordinateHelpTooltipProps {
  className?: string;
}

const CoordinateHelpTooltip: React.FC<CoordinateHelpTooltipProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("/tp @p ~ ~ ~");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-gray-700"
        aria-label="How to get coordinates"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Tooltip */}
          <div className="absolute z-50 left-0 top-full mt-2 w-72 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-sm">
                📍 How to Get Coordinates
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="font-semibold text-blue-400 mb-1">
                  Java Edition:
                </div>
                <p>
                  Press{" "}
                  <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-white">
                    F3
                  </kbd>{" "}
                  to open debug screen
                </p>
                <p className="text-gray-400 mt-1">
                  Look for "XYZ:" line with your coordinates
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="font-semibold text-green-400 mb-1">
                  Bedrock Edition:
                </div>
                <p>Settings → Game → Show Coordinates: ON</p>
                <p className="text-gray-400 mt-1">
                  Coordinates appear at top of screen
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="font-semibold text-yellow-400 mb-1">
                  Format Example:
                </div>
                <code className="bg-gray-700 px-2 py-1 rounded block mt-1 text-white">
                  1234, 64, -5678
                </code>
                <p className="text-gray-400 mt-1">
                  (X, Y, Z - comma separated)
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy TP command: /tp @p ~ ~ ~</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoordinateHelpTooltip;
