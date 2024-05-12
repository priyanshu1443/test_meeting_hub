// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <GoogleOAuthProvider clientId="222650483902-nm0g0ak1vdmf5vrcrodl1565f8frtrhq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  
);
