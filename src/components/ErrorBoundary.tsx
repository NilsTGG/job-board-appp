import React from "react";
import { log } from "../utils/logger";

interface State {
  hasError: boolean;
  detail?: string;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: unknown): State {
    return {
      hasError: true,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    log.error("render error", { error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="text-sm text-gray-400 mb-4">
            An unexpected error occurred while rendering the app.
          </p>
          {import.meta.env.DEV && (
            <pre className="text-xs bg-gray-800 p-3 rounded max-w-lg overflow-auto border border-gray-700 w-full">
              {this.state.detail}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
