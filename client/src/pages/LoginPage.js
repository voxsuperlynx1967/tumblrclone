import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { Redirect } from 'react-router-dom'
import { Container} from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './LoginPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';
import { useHistory } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LoginNavBar from "../components/auth/LoginNavBar";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  MuiButton: {
    label: {
      color: "white",
    }
  },
})

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        background: "white",
        font: "15px Helvetica Neue",
        padding: "20px",
      }
    },
    MuiButtonBase: {
      root: {
        margin: "10px 0px 0px 10px",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
        font: "15px Helvetica Neue",
        fontWeight: "bold",
        padding: "10px",
      }
    }
  },
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // history.push("/dashboard");
  }
  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    dispatch(login("snc40@georgetown.edu", "password"));
    // history.push("/dashboard");
  }



  if (currentUser.id || currentUser.user) return <Redirect to="/dashboard" />;
  return (
    <>
      <div class="login-wrapper">
        <LoginNavBar/>
        <div id="errors-container2"></div>

        <Container
          classes={{ root: classes.container }}
          fixed
          maxWidth="sm">
          <YumblrLogo id="yumblrlogo1"/>
          <form onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
              <AuthTextField id="textfield1"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <AuthTextField id="textfield2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              <AuthSubmitButton>Log in</AuthSubmitButton>
              <form onSubmit={handleDemoSubmit}>
                <AuthSubmitButton>Log in as demo user</AuthSubmitButton>
              </form>
            </ThemeProvider>
          </form>
        </Container>

      </div>
    </>
  )

}



export default LoginPage;
