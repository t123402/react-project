import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import MainRoutes from "./routes/MainRoutes";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen bg-gray-100">
					<NavBar />
					<MainRoutes />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
