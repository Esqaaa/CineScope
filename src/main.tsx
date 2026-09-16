import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import App from "./App";
import { CineScopeProvider } from "./context/CineScopeProvider";


createRoot(document.getElementById('root')!).render(
  <CineScopeProvider>
    <App />
  </CineScopeProvider>
)
