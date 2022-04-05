import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginReducer } from "./reducers/loginReducer";
import { registrationsReducer } from "./reducers/registrationsReducer";
const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	userLogin: loginReducer,
	userRegister: registrationsReducer,
});

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

export { store, persistor };
