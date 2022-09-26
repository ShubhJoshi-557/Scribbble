import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import scribbbleLogo from '../../images/scribbbleLogo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };
  // console.log(user);
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar elevation={0} className={[classes.appBar, 'appBar'].join(' ')} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={scribbbleLogo} alt="icon" height="25px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            
            <Link to={`/creators/${user?.result._id?user?.result._id:user?.result.googleId}/${user?.result.name}`} style={{ textDecoration: 'none'}}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            </Link>

            <Link to={`/creators/${user?.result._id?user?.result._id:user?.result.googleId}/${user?.result.name}`} style={{ textDecoration: 'none'}}>
              <Typography className={classes.userName}>{user?.result.name}</Typography>
            </Link>
            
            <Button elevation={0} variant="contained" className={[classes.logout, 'signInBtn'].join(' ')} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button elevation={0} component={Link} to="/auth" className={[classes.logout, 'signInBtn'].join(' ')} variant="contained">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
