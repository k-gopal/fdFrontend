import type from "./type"

const INITIAL_STATE = {
    isLoggedIn: false,
    userDetails: {
        name: "",
        profession: "",
        email: "",
        token: ""
    }
}

const reducerHandler = (action, state = INITIAL_STATE) => {
    const reducerObject = {
        [type.IS_LOGGED_IN]: () => {
            return {
                ...state,
                isLoggedIn: action.value
            }
        },
        [type.SET_NAME_PROFESSION]: () => {
            console.log(action.value)
            return {
                ...state,
                userDetails: {
                    name: action.value.name,
                    profession: action.value.profession,
                    email: action.value.email,
                    token: action.value.token
                }
            }
        }
    };

    return (reducerObject[action.type] && reducerObject[action.type]()) || state;
}

const reducerHome = (state, action) => reducerHandler(action, state);
export default reducerHome;