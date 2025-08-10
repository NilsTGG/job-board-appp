import React, { useEffect, useState } from "react";
import { log } from "../utils/logger";

export const DevDiagnostics: React.FC = () => {
  const [timing, setTiming] = useState<PerformanceTiming | null>(null);
  useEffect(() => {
    if ("performance" in window)
      setTiming(performance.timing as PerformanceTiming);
  }, []);
  useEffect(() => {
    log.debug("DevDiagnostics mounted");
  }, []);
  return (
    <div className="fixed top-2 left-2 z-50 bg-black/70 text-xs text-gray-200 p-3 rounded border border-gray-700 space-y-1 max-w-xs pointer-events-none">
      <div className="font-semibold text-blue-300">Diagnostics</div>
      <div>ENV: {import.meta.env.MODE}</div>
      <div>Build: {import.meta.env.DEV ? "dev" : "prod"}</div>
      <div>
        UserAgent: {navigator.userAgent.split(" ").slice(0, 3).join(" ")}
      </div>
      {timing && (
        <div>
          DOMContentLoaded:{" "}
          {timing.domContentLoadedEventEnd - timing.navigationStart}ms
        </div>
      )}
    </div>
  );
};
