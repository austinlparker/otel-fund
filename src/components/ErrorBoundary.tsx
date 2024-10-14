"use client";

import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-6 bg-fuschia-50 dark:bg-fuschia-900 text-fuschia-900 dark:text-fuschia-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <details className="mb-4">
            <summary className="cursor-pointer font-semibold mb-2">
              Error details
            </summary>
            <pre className="whitespace-pre-wrap bg-white dark:bg-fuschia-800 p-4 rounded-md overflow-auto">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <div className="error-fallback">{this.props.fallback}</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
