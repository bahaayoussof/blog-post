import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./lib/react-queries/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryProvider>
			<App />
		</QueryProvider>
	</React.StrictMode>
);
