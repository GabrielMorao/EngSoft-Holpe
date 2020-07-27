import React, { createContext, useReducer } from "react";
import { authenticateUser } from "./services/auth"

const initialState = {
    userType: authenticateUser()
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case "login_success":
                const newState = {
                    userType: action.data ? "volunteer" : "solicitant"
                };
                return newState;
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};

export { store, StateProvider }