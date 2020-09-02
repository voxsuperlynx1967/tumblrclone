import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/auth';
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './LoginPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})
