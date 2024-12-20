import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ItemsPage from "../pages/ItemsPage";
import CounterPage from "../pages/CounterPage";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<CounterPage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/item"
				element={
					<ProtectedRoute>
						<ItemsPage />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default MainRoutes;
