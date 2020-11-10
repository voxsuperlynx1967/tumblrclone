import Cookies from 'js-cookie';

const SET_USER = 'authentication/SET_USER';
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
    const { message } = res.data;
    debugger
    const errorsContainer = document.getElementById("errors-container2");
    if (message) {
        errorsContainer.style.display = "flex";
        errorsContainer.style.justifyContent = "center";
        errorsContainer.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
        errorsContainer.style.flexDirection = "row";
        errorsContainer.style.border = "1px solid red"
        errorsContainer.style.borderRadius = "5px";
        const errorLi = document.createElement("li");
        errorLi.innerHTML = message;
        errorsContainer.appendChild(errorLi);

    }

    if (res.ok) {
        dispatch(setUser(res.data.user));
    }

  }
}

export const logout = () => {
  return async (dispatch) => {
    const res = await fetch('/api/session', {
      method: "delete",
      headers: {
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
      },
    });
    if (res.ok) dispatch(removeUser());
    res.data = await res.json();
    return res;
  };
};

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
    res.data = await res.json();
    const { error } = res.data;
    debugger
    const errorsContainer = document.getElementById("errors-container");
    errorsContainer.innerHTML = "";
    errorsContainer.style.display = "none";
    if (error) {
        errorsContainer.style.display = "flex";
        errorsContainer.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        errorsContainer.style.flexDirection = "column";
        errorsContainer.style.border = "1px solid red"
        errorsContainer.style.borderRadius = "5px";
        const errors = error.errors;
        for (let error1 of errors) {
        const errorLi = document.createElement("li");
        errorLi.innerHTML = error1;
        errorsContainer.appendChild(errorLi);
        }
    }

    if (res.ok) {
        dispatch(setUser(res.data.user));
    }

  }
}

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
