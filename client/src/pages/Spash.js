import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './SignupPage.css';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  exploreIcon: {
    color: "white",
  }
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
        padding: "10px"
      }
    }
  },
});

function Splash() {
  const currentUserId = useSelector(state => state.auth.id);
  const classes = useStyles();
  const history = useHistory();


  const loginclick = async (e) => {
    e.preventDefault();
    history.push("/login");
  }

  const signupclick = async (e) => {
    e.preventDefault();
    history.push("/signup");
  }



  if (currentUserId) return <Redirect to="/dashboard" />;
  return (
    <div class="signup-wrapper">
      <Container
        classes={{ root: classes.container }}
        fixed
        maxWidth="sm">
        <YumblrLogo id="yumblrlogo1"/>
        <span id="bigspan">
          <span>Come for what you crave.
          </span>
          <span>Stay for what you devour.
          </span>
        </span>
          <ThemeProvider theme={theme}>
          <AuthSubmitButton
            onClick={signupclick}
            >Get Started</AuthSubmitButton>
            <AuthSubmitButton
            onClick={loginclick}
            >Log in</AuthSubmitButton>
            </ThemeProvider>
            <div id="expore">
              <NavLink id ="navtoexplore" to="/">
                <ExploreOutlinedIcon classes={{ root: classes.exploreIcon }}/>
                <span id="trending">
                  Join us to see what's trending
                </span>
              </NavLink>
            </div>
      </Container>

    </div>
  )

}



export default Splash;
