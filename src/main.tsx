import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DevDiagnostics } from "./components/DevDiagnostics";
import { log } from "./utils/logger";

const rootEl = document.getElementById("root");
if (!rootEl) {
  log.error("Root element not found");
  throw new Error("Root element #root missing");
}
const debug = new URLSearchParams(window.location.search).has("debug");
createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      {debug && <DevDiagnostics />}
      <App />
    </ErrorBoundary>
  </StrictMode>
);
log.info("App bootstrap complete");
