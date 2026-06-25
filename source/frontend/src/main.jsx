import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import AuthProvider from "./app/providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>

        <AuthProvider>

            <App />

        </AuthProvider>

    </BrowserRouter>
);
