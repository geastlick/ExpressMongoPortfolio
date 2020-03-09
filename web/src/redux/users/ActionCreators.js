import * as ActionTypes from './ActionTypes';

export const loginFailed = errMess => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess
});

// Not exported -- only entry is via userLogin
const loginUser = userObj => ({
    type: ActionTypes.LOGIN_USER,
    payload: userObj
})

export const userLogin = (username, password) => dispatch => {

    const credentials = {
        username: username,
        password: password
    };

    return fetch('/auth/login', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(data => {
            localStorage.setItem("token", data.access_token)
            dispatch(loginUser(data.user))
        })
        .catch(
            error => dispatch(loginFailed(error.message))
        );
};

// Not exported -- only entry is via userLogout
const logoutUser = userObj => ({
    type: ActionTypes.LOGOUT_USER
})
export const userLogout = () => dispatch => {
    localStorage.removeItem("token")
    dispatch(logoutUser())
};

export const fetchProfile = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch("/auth/user", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // An error will occur if the token is invalid.
                        // If this happens, you may want to remove the invalid token.
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data.user))
                    }
                })
        }
    }
}