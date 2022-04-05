import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { FormControl } from "@mui/material";
import "./common.css";
import userInput from "../validationHooks/userInput";
import { loginActions } from "../redux/actions/loginActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	// Email input
	const {
		enteredInput: enteredEmail,
		inputValid: emailInputIsValid,
		inputInvalid: emailInputIsInvalid,
		blurHandler: emailInputBlurHandler,
		changeHandler: emailInputChangeHandler,
		reset: emailInputReset,
	} = userInput("", (value) => value.includes("@"));

	// Password Input
	const {
		enteredInput: enteredPassword,
		inputValid: passwordInputIsValid,
		inputInvalid: passwordInputIsInvalid,
		blurHandler: passwordInputBlurHandler,
		changeHandler: passwordInputChangeHandler,
		reset: passwordInputReset,
	} = userInput("", (value) => value.trim().length >= 8);

	const submitHandler = async (e) => {
		e.preventDefault();

		emailInputBlurHandler();
		passwordInputBlurHandler();

		if (!emailInputIsValid || !passwordInputIsValid) {
			return;
		}

		const newInfo = {
			email: enteredEmail,
			password: enteredPassword,
		};

		const data = await dispatch(loginActions(newInfo));

		if (!data.isLoggedIn) {
			toast.error(data.payload);
			return;
		}

		navigate("/home", { replace: true });
		window.location.reload(false);
		emailInputReset();
		passwordInputReset();
	};
	return (
		<div className="Main">
			<div className="title-name">Welcome Back</div>
			<div>
				<FormControl>
					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "52ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="standard-basic"
							label="Email"
							variant="standard"
							value={enteredEmail}
							onChange={emailInputChangeHandler}
							onBlur={emailInputBlurHandler}
						/>
						{emailInputIsInvalid && (
							<p className="error"> Please enter valid email!</p>
						)}
					</Box>
					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "52ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="standard-basic"
							label="Password"
							variant="standard"
							type="password"
							value={enteredPassword}
							onChange={passwordInputChangeHandler}
							onBlur={passwordInputBlurHandler}
						/>
						{passwordInputIsInvalid && (
							<p className="error"> Please enter valid password!</p>
						)}
					</Box>

					<Button
						className="submit-btn"
						variant="contained"
						endIcon={<SendIcon />}
						onClick={submitHandler}
					>
						Login
					</Button>
				</FormControl>
			</div>
		</div>
	);
};

export default LoginPage;
