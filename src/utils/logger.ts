// Lightweight structured logger with optional floating panel (?debug=1)
// Import and use: log.info('message', data)

type Level = "info" | "warn" | "error" | "debug";
interface LogEntry {
  ts: string;
  level: Level;
  msg: string;
  data?: unknown;
}

const buffer: LogEntry[] = [];
const MAX = 200;
const hasPanel =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("debug");

function timestamp() {
  return new Date().toISOString().split("T")[1].replace("Z", "");
}

function push(entry: LogEntry) {
  buffer.push(entry);
  if (buffer.length > MAX) buffer.shift();
  if (hasPanel) {
    const el = document.getElementById("__debug_panel");
    if (el) {
      const line = document.createElement("div");
      line.className = `text-xs font-mono whitespace-pre break-words px-1 level-${entry.level}`;
      line.textContent = `${entry.ts} [${entry.level.toUpperCase()}] ${
        entry.msg
      }`;
      el.appendChild(line);
      el.scrollTop = el.scrollHeight;
    }
  }
}

function emit(level: Level, msg: string, data?: unknown) {
  const entry: LogEntry = { ts: timestamp(), level, msg, data };
  const method = level === "info" || level === "debug" ? "log" : level;
  console[method](`[${level.toUpperCase()}] ${msg}`, data ?? "");
  push(entry);
  return entry;
}

export const log = {
  info: (m: string, d?: unknown) => emit("info", m, d),
  warn: (m: string, d?: unknown) => emit("warn", m, d),
  error: (m: string, d?: unknown) => emit("error", m, d),
  debug: (m: string, d?: unknown) => {
    if (import.meta.env.DEV || hasPanel) emit("debug", m, d);
  },
  getBuffer: () => [...buffer],
};

if (hasPanel && typeof window !== "undefined") {
  const host = document.createElement("div");
  host.id = "__debug_panel";
  host.style.cssText = [
    "position:fixed",
    "bottom:0",
    "right:0",
    "width:380px",
    "max-height:40vh",
    "overflow:auto",
    "z-index:99999",
    "background:rgba(0,0,0,0.85)",
    "color:#eee",
    "font-family:ui-monospace,monospace",
    "padding:4px",
    "border:1px solid #444",
    "backdrop-filter:blur(4px)",
    "border-radius:4px 0 0 0",
  ].join(";");
  const bar = document.createElement("div");
  bar.style.cssText =
    "display:flex;gap:8px;align-items:center;margin-bottom:4px;font-size:11px";
  bar.innerHTML =
    '<strong style="color:#6cf">Logs</strong><button id="__dbg_clr" style="background:#222;color:#eee;border:1px solid #444;padding:2px 6px;font-size:10px;cursor:pointer">clear</button>';
  host.appendChild(bar);
  document.addEventListener("click", (e) => {
    if ((e.target as HTMLElement)?.id === "__dbg_clr") {
      const panel = document.getElementById("__debug_panel");
      if (panel)
        panel.querySelectorAll("div").forEach((n, i) => {
          if (i > 0) n.remove();
        });
    }
  });
  document.body.appendChild(host);
  log.info("Debug log panel mounted");
}

if (typeof window !== "undefined") {
  window.addEventListener("error", (ev) => {
    log.error("window.error", {
      message: ev.message,
      filename: ev.filename,
      lineno: ev.lineno,
      colno: ev.colno,
      stack: ev.error?.stack,
    });
  });
  window.addEventListener("unhandledrejection", (ev) => {
    log.error("unhandledrejection", {
      reason: (ev as PromiseRejectionEvent).reason,
    });
  });
}
