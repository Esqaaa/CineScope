import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import App from "./App";
import { CineScopeProvider } from "./context/CineScopeProvider";
import ErrorBoundary from "./components/ErrorBoundary";

// Rendu de l'application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <CineScopeProvider>
        <App />
      </CineScopeProvider>
    </ErrorBoundary>
  </StrictMode>
);