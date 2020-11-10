import React from 'react';

import { Route } from  'react-router-dom';

import LoginPage from './LoginPage';

import SignupPage from './SignupPage';

import Dashboard from './Dashboard';

import Splash from './Spash';

import Blog from './Blog';

import TagBlog from './TagBlog';

export default function Pages() {
  return (
    <>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blogs/:id" component={Blog} />
      <Route path="/tags/:id" component={TagBlog} />
      <Route exact path="/" component={Splash} />
    </>
  )
}
