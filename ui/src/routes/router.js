/** @format */

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";

function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />

				<Route
					path="/home"
					element={
						localStorage.getItem("accessToken") ? (
							<HomePage />
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route path="*" element={<Navigate to="/home" />} />
			</Routes>
		</>
	);
}

export default Router;
