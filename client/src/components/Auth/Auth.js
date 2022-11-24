import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FileBase from 'react-file-base64';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="bg">
      <Container>
        <Paper className={classes.paper} elevation={10}>
          <Grid container justify="space-between" alignItems="stretch" className={classes.grid}>
            <div className={[classes.art, "art"].join(' ')} >
              <Typography component="h1" className={classes.typo1} >{ isSignup ? 'Sign up to Scribbble' : 'Sign in to Scribbble' }</Typography> 
              <Typography component="h1" className={classes.typo2} >Discover the world’s top Developers & Web Designers.</Typography>    
            </div>
            <div className={classes.mainform}>
            
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  { isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                  )}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  { isSignup && (
                  <>
                    <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, imageUrl: base64 })} />
                  </>)
                  }
                </Grid>
                <Button type="submit" fullWidth variant="contained" className={[classes.submit, "signInBtn"].join(' ')}>
                  { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                {/* <GoogleLogin
                  clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button className={classes.googleButton} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                /> */}
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button className={classes.routeBtn} onClick={switchMode}>
                      { isSignup ? 'Already a member? Sign in' : "Not a member? Sign Up Now" }
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
