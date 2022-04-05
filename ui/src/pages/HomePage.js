import React from "react";
import { useSelector } from "react-redux";
import Footer from "../componets/Footer";
import Header from "../componets/Header";

const HomePage = () => {
	const userInfos = useSelector((state) => state.userLogin.userInformation);

	return (
		<>
			<Header></Header>
			<div style={{ lineHeight: "495px", fontSize: "50px" }}>
				Welcome, {userInfos.result.first_name}
			</div>
			<Footer></Footer>
		</>
	);
};

export default HomePage;
