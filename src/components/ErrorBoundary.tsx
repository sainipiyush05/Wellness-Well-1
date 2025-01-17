import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-surface-darker">
          <div className="max-w-md w-full bg-surface-dark rounded-xl p-8 text-center border border-gray-800">
            <FaExclamationTriangle className="w-16 h-16 text-primary mx-auto mb-6" />

            <h1 className="text-2xl font-bold mb-4 gradient-text">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-400 mb-6">
              We apologize for the inconvenience. The application encountered an
              unexpected error.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 text-left">
                <details className="bg-surface-darker rounded-lg p-4">
                  <summary className="text-primary cursor-pointer mb-2">
                    Error Details
                  </summary>
                  <pre className="text-xs text-gray-400 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-medium transition-colors duration-300 mx-auto"
            >
              <FaRedo className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
