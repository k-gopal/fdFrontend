import type from "./type"

export const setIsLoggedIn = (value) => (dispatch) => {
    dispatch({
        type: type.IS_LOGGED_IN,
        value
    })
}