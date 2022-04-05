import "./App.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Router from "./routes/router";
import { setSession } from "./utils/jwt";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const userInfos = useSelector((state) => state.userLogin.userInformation);

	useEffect(() => {
		if (location.pathname === "/") {
			if (localStorage.getItem("accessToken")) {
				const accessToken = localStorage.getItem("accessToken");
				setSession(accessToken);
				navigate("/home");
			}
		} else if (localStorage.getItem("accessToken")) {
			navigate(location);
		} else navigate("/"); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfos]);

	return (
		<div className="App">
			<Router></Router>
		</div>
	);
}

export default App;
