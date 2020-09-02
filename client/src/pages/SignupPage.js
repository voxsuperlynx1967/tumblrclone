import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/auth';
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './SignupPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
      </Container>
    </>
  )
}



export default SignupPage;
