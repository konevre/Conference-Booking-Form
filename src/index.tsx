import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App/App";
import "./style/style.css";

const rootEl = document.querySelector("#root") as HTMLElement;
if (!rootEl) throw new Error("Cannot find root element with that id");
const root = createRoot(rootEl);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
