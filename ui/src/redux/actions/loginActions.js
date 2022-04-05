import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
} from "../constants/userConstants";

export const loginActions = ({ email, password }) => async (dispatch) => {
	await dispatch({ type: USER_LOGIN_REQUEST });

	try {
		const res = await axios.post(`http://localhost:8000/api/v1/auth/login`, {
			email,
			password,
		});

		if (res.data.data) {
			localStorage.setItem("accessToken", res.data.data.token);

			return dispatch({
				type: USER_LOGIN_SUCCESS,
				isLoggedIn: true,
				payload: res.data.data ? res.data.data : "",
			});
		}

		if (res.data.status === false) {
			return dispatch({
				type: USER_LOGIN_FAIL,
				isLoggedIn: false,
				payload: res.data.message,
			});
		}
	} catch (err) {
		return dispatch({ type: USER_LOGIN_FAIL, isLoggedIn: false });
	}
};
