import Cookies from 'js-cookie';

const SET_USER = 'auth/SET_USER';
const REMOVE_USER = 'authentication/REMOVE_USER';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }


}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}
export const login = (email, password) => {
  return async dispatch => {
    const res = await fetch('/api/session', {

      method: "put",
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
      },
      body: JSON.stringify({ email, password })

    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(setUser(res.data))
    }
    return res;
  }
}

export const logout = () => { //no payload, body, parameter for url path
  return async dispatch => {
    const res = await fetch('/api/session', {

      method: "delete",

    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(removeUser(res.data))
    }
    return res;
  }
}

window.login = login;
window.logout = logout;

export default function authReducer(state={}, action) {
  switch(action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
