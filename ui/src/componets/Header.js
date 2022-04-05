import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./common.css";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
	let navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("accessToken");
		navigate("/", { replace: true });
	};

	return (
		<div>
			<div className="main">
				<div className="title">Student Dashboard</div>
				<div className="bg">
					<Button
						className="submit-btn"
						variant="contained"
						endIcon={<LogoutIcon />}
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
