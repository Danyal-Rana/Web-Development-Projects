import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {AuthContext} from "./context/AuthProvider";

/*
import authUser from "./context/AuthProvider";
import setAuthUser from "./context/AuthProvider";
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* // <AuthContext.Provider value={[authUser, setAuthUser]}> */}
    <AuthContext.Provider value={[]}>
      <div className="dark:bg-slate-900 dark:text-white">
        <App />
      </div>
    </AuthContext.Provider>
  </BrowserRouter>
);
