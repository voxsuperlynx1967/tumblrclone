import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/auth';
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './SignupPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';
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

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup( email, password, username ));


  }


  return (
    <>
      {/* <NavBar/> */}
      <Container
        classes={{ root: classes.container }}
        fixed
        maxWidth="sm">
        <YumblrLogo/>
        <span id="bigspan">
          <span>Come for what you crave.
          </span>
          <span>Stay for what you devour.
          </span>
        </span>
        <form onSubmit={handleSubmit}>
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
          <AuthTextField id="textfield3"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
          <AuthSubmitButton>Sign up</AuthSubmitButton>
        </form>
        <div id="expore">
          <NavLink id ="navtoexplore" to="/">
            <ExploreOutlinedIcon classes={{ root: classes.exploreIcon }}/>
            <span id="trending">
              Here's what's trending
            </span>
          </NavLink>
        </div>
      </Container>
    </>
  )
}



export default SignupPage;
