import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from "../constants/userConstants";

const initialState = {
	userInformation: [],
};
export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				userInformation: action.payload,
			};
		case USER_LOGIN_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case USER_LOGOUT:
			console.log("logout");
			return {};
		default:
			return state;
	}
};
