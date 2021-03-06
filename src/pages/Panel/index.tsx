import React from "react";
import { createRoot } from "react-dom/client";
import Panel from "@pages/Panel/Panel";
import "@pages/Panel/index.css";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    return;
  }
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
