import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { FormControl } from "@mui/material";
import "./common.css";
import userInput from "../validationHooks/userInput";
import { registrationActions } from "../redux/actions/registrationActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	// first name Input
	const {
		enteredInput: enterFirstName,
		inputValid: firstNameInputIsValid,
		inputInvalid: firstNameInputIsInvalid,
		blurHandler: firstNameInputBlurHandler,
		changeHandler: firstNameInputChangeHandler,
		reset: firstNameInputReset,
	} = userInput("", (value) => value.trim() !== "");

	// last name Input
	const {
		enteredInput: enterLastName,
		inputValid: lastNameInputIsValid,
		inputInvalid: lastNameInputIsInvalid,
		blurHandler: lastNameInputBlurHandler,
		changeHandler: lastNameInputChangeHandler,
		reset: lastNameInputReset,
	} = userInput("", (value) => value.trim() !== "");

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

	// Confirm Password Input
	const {
		enteredInput: enteredConfirmPassword,
		inputValid: confirmPasswordInputIsValid,
		inputInvalid: confirmPasswordInputIsInvalid,
		blurHandler: confirmPasswordInputBlurHandler,
		changeHandler: confirmPasswordInputChangeHandler,
		reset: confirmPasswordInputReset,
	} = userInput("", (value) => value.trim() === enteredPassword);

	const submitHandler = async (e) => {
		e.preventDefault();

		firstNameInputBlurHandler();
		lastNameInputBlurHandler();
		emailInputBlurHandler();
		passwordInputBlurHandler();
		confirmPasswordInputBlurHandler();

		if (
			!firstNameInputIsValid ||
			!lastNameInputIsValid ||
			!emailInputIsValid ||
			!passwordInputIsValid ||
			!confirmPasswordInputIsValid
		) {
			return;
		}

		const newInfo = {
			first_name: enterFirstName,
			last_name: enterLastName,
			email: enteredEmail,
			password: enteredPassword,
		};
		const data = await dispatch(registrationActions(newInfo));

		if (!data.isLoggedIn) {
			toast.error(data.payload);
			return;
		}
		navigate("/home", { replace: true });
		window.location.reload(false);

		firstNameInputReset();
		lastNameInputReset();
		emailInputReset();
		passwordInputReset();
		confirmPasswordInputReset();
	};

	return (
		<div className="Main">
			<div className="title-name">Welcome </div>
			<div>
				<FormControl>
					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "26ch" },
						}}
						noValidate
						autoComplete="off"
						className="display-flex-show	"
					>
						<div>
							{" "}
							<TextField
								id="standard-basic"
								label="Student First Name"
								variant="standard"
								value={enterFirstName}
								onChange={firstNameInputChangeHandler}
								onBlur={firstNameInputBlurHandler}
							/>
							{firstNameInputIsInvalid && (
								<p className="error"> Please enter student first name!</p>
							)}
						</div>
						<div>
							{" "}
							<TextField
								id="standard-basic"
								label="Student Last Name"
								variant="standard"
								value={enterLastName}
								onChange={lastNameInputChangeHandler}
								onBlur={lastNameInputBlurHandler}
							/>
							{lastNameInputIsInvalid && (
								<p className="error"> Please enter student last name!</p>
							)}
						</div>
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
							label="Confirm Password"
							variant="standard"
							type="password"
							value={enteredConfirmPassword}
							onChange={confirmPasswordInputChangeHandler}
							onBlur={confirmPasswordInputBlurHandler}
						/>
						{confirmPasswordInputIsInvalid && (
							<p className="error">
								{" "}
								confirm password does not match with password!
							</p>
						)}
					</Box>
					<Button
						className="submit-btn"
						variant="contained"
						endIcon={<SendIcon />}
						onClick={submitHandler}
					>
						Submit
					</Button>
				</FormControl>
			</div>
		</div>
	);
};

export default LoginPage;
