import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './LoginPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';
// import NavBar from '../components/auth/NavBar';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    history.push("/");
  }


  if (currentUserId) return <Redirect to="/" />;
  return (
    <div class="login-wrapper">
      {/* <NavBar/> */}
      <Container
        classes={{ root: classes.container }}
        fixed
        maxWidth="sm">
        <YumblrLogo/>
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
          <AuthSubmitButton>Log in</AuthSubmitButton>
        </form>
      </Container>

    </div>
  )

}



export default LoginPage;
