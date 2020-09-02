import React from 'react';

import { Route } from  'react-router-dom';

import LoginPage from './LoginPage';

import SignupPage from './SignupPage';

import Dashboard from './Dashboard';

export default function Pages() {
  return (
    <>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard" component={Dashboard} />

      <Route exact path="/">
        <h1>My Home Page</h1>
      </Route>
    </>
  )
}
