import {
	USER_REGISTRATION_REQUEST,
	USER_REGISTRATION_SUCCESS,
	USER_REGISTRATION_FAIL,
	USER_LOGOUT,
} from "../constants/userConstants";

const initialState = {
	userInformation: [],
};
export const registrationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_REGISTRATION_REQUEST:
			return { loading: true };
		case USER_REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				userInformation: action.payload,
			};
		case USER_REGISTRATION_FAIL:
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
