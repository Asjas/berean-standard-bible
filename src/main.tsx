import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "~/styles/app.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <div>
      <h1>Berean Standard Bible</h1>
      <p>App loading...</p>
    </div>
  </StrictMode>,
);
