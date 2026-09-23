import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Composant d'écran de secours si crash critique de l'app
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Intercepte l'erreur et met à jour l'erreur
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Log l'erreur + informations de rendu dans la console
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur capturée par l'ErrorBoundary :", error, errorInfo);
  }

  // Reinitialise état et redirige vers l'accueil
  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  public render() {
    // Erreur -> affichage de secours
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

    // Sinon, on affiche le composant normal
    return this.props.children;
  }
}

export default ErrorBoundary;