import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, FormControl, InputLabel, Button, Input, makeStyles } from '@material-ui/core';
import illustration from '../Illustration.svg';
import { ThemeContext } from './ThemeContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '1240px',
    height: '800px',
    padding: '50px 30px',
    margin: '50px auto',
    borderRadius: '20px',
    display: 'flex'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  img: {
    width: '600px'
  },
  div2: {
    width: '600px',
    padding: '20px 60px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState('false');
  const [error, setError] = useState(false);
  const { loggedIn, loggedHandle } = useContext(ThemeContext);
  const classes = useStyles();

  useEffect(() => {
    if (submit === 'true') {
      let formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api-token-auth/',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function({ data }) {
          //handle success
          console.log(data);
          loggedHandle(true);
          localStorage.setItem('token', data.token);
        })
        .catch(function(response) {
          //handle error
          setError(true);
          console.log(response);
        });
    }
  }, [submit]);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const val = submit === 'true' ? 'false' : 'true';
    setSubmit(val);
    /* let formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api-token-auth/',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        }); */
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        {loggedIn && <Redirect to={{ pathname: '/register' }} />}
        <div className={classes.container}>
          <img src={illustration} alt="illustration" className={classes.img} />
        </div>
        <div className={classes.div2}>
          <Typography variant="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl style={{ marginTop: '20px', backgroundColor: '#eee' }}>
              <InputLabel style={{ fontSize: '24px', marginLeft: '10px' }} htmlFor="email">
                Email
              </InputLabel>
              <Input style={{ height: '40px' }} id="email" name="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl style={{ marginTop: '20px', backgroundColor: '#eee' }}>
              <InputLabel style={{ fontSize: '24px', marginLeft: '10px' }} htmlFor="password">
                Password
              </InputLabel>
              <Input
                style={{ height: '40px' }}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{ marginTop: '30px', width: '300px', borderRadius: '50px' }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </div>
            {error ? <p style={{ color: 'red' }}>Incorrect Credentials</p> : ''}
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
