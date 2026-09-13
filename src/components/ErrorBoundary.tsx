import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-6 sm:p-8 bg-white border-2 border-[#050505] rounded-[24px] shadow-retro space-y-4 text-[#050505]">
          <div className="flex items-center gap-3 text-[#F05D5E]">
            <AlertTriangle className="w-8 h-8 shrink-0" />
            <h2 className="text-xl font-black">{this.props.fallbackTitle || 'Component Error'}</h2>
          </div>
          <p className="text-sm font-semibold text-[#050505]/80">
            A temporary display error occurred while rendering this section.
          </p>
          {this.state.error && (
            <div className="p-3 bg-[#F7F7F5] border border-[#050505]/20 rounded-xl font-mono text-xs overflow-x-auto">
              {this.state.error.message}
            </div>
          )}
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] transition-all border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
