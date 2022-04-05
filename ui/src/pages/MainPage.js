import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`action-tabpanel-${index}`}
			aria-labelledby={`action-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 0 }}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `action-tab-${index}`,
		"aria-controls": `action-tabpanel-${index}`,
	};
}

export default function MainPage() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<>
			<div className="std-title">Student Portal</div>
			<ToastContainer />
			<Box
				sx={{
					width: 650,
					position: "relative",
					minHeight: 200,
					marginLeft: 40,
					border: "1px",
					marginTop: "50px",
				}}
			>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="action tabs example"
					>
						<Tab label="SignIn" {...a11yProps(0)} />
						<Tab label="Signup" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<LoginPage></LoginPage>
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<RegistrationPage></RegistrationPage>
					</TabPanel>
				</SwipeableViews>
			</Box>
		</>
	);
}
