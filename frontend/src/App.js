import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import ThemeContextProvider from './components/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import { ThemeContext } from './components/ThemeContext';
import Home from './components/Home';
import Business from './components/Business';
import Profile from './components/Profile';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4195B4' },
    background: {
      default: '#f3f9fb'
    }
  },
  typography: {
    fontFamily: ['Lato', 'Segoe UI', 'Roboto', 'Helvetica Neue'].join(',')
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ThemeContextProvider>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/business">
                <Business />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <PrivateRoute path="/register">
                <Register />
              </PrivateRoute>
            </Switch>
          </Router>
        </ThemeContextProvider>
      </ThemeProvider>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { loggedIn } = useContext(ThemeContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
