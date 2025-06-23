// client/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // <-- IMPORT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        {" "}
        {/* <-- WRAP HERE */}
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
