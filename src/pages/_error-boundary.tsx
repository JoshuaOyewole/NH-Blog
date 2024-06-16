import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="bg-[#000] h-screen flex flex-col justify-center items-center">
                    <h1 className="text-6xl">🫢</h1>
                    <h1 className="text-white text-2xl">Sorry.. there was an error</h1>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
