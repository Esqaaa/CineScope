import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Met à jour l'état pour que le prochain rendu affiche l'interface de secours
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur capturée par l'ErrorBoundary :", error, errorInfo);
  }

  private handleReset = () => {
    // Réinitialise l'état d'erreur et redirige vers l'accueil
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <h1>Une erreur est survenue</h1>
            <p>CineScope a rencontré un problème inattendu.</p>
            <button onClick={this.handleReset} className="error-boundary-button">
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;