import type from "./type"

export const setIsLoggedIn = (value) => (dispatch) => {
    dispatch({
        type: type.IS_LOGGED_IN,
        value
    })
};

export const setNameProfession = (value) => (dispatch) => {
    dispatch({
        type: type.SET_NAME_PROFESSION,
        value
    })
}