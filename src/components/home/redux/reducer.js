import type from "./type"

const INITIAL_STATE = {
    isLoggedIn: true
}

const reducerHandler = (action, state = INITIAL_STATE) => {
    const reducerObject = {
        [type.IS_LOGGED_IN]: () => {
            console.log(action.value)
            return {
                ...state,
                isLoggedIn: action.value
            }
        }
    };

    return (reducerObject[action.type] && reducerObject[action.type]()) || state;
}

const reducerHome = (state, action) => reducerHandler(action, state);
export default reducerHome;