import Cookies from 'js-cookie';

const SET_USER = 'authentication/SET_USER';
const REMOVE_USER = 'authentication/REMOVE_USER';
const SIGNUP ='SIGNUP';

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

const newUser = (user) => ({
  type: SIGNUP,
  user
})

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
    debugger
    if (res.ok) {
      dispatch(setUser(res.data))
    }
    return res;
  }
}

export const logout = () => {
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

export const signup = (email, password, username) => {
  return async (dispatch) => {
    const res = await fetch('api/users', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
      },
      body: JSON.stringify({ email, password, username})
    });
    const data = await res.json();
    dispatch(newUser(data));
    res.data = data;
    return res;
  }
}

window.login = login;
window.logout = logout;

export default function authReducer(state={}, action) {
  switch(action.type) {
    case SET_USER || SIGNUP:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
