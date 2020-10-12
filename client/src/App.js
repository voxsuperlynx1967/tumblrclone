import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import { setUser } from './store/auth';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";





function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
        dispatch(setUser(res.data.user))
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
        <CssBaseline />
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    </>
  );
}

export default App;
