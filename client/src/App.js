import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';


import scribbbleLogo from './images/scribbbleLogoPink.png'


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="100%" maxHeight="100%">
        <Navbar />
        <div class='bodyDiv'>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path={['/creators/:creatorID/:name', '/tags/:name']} component={CreatorOrTag} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </div>
        
        <footer>
          <div >
            <img src={scribbbleLogo} alt="icon" height="50px" />
            <h3> Scribbble is the world’s leading community for developers to share, grow, and get inspired.</h3>
            <a href="https://github.com/ShubhJoshi-557"><GitHubIcon fontSize='medium'></GitHubIcon></a>
            <a href="https://www.linkedin.com/in/shubhjoshi557/"><LinkedInIcon fontSize='medium'></LinkedInIcon></a>
            <a href="mailto:shubhjoshi80@gmail.com"><EmailIcon fontSize='medium'></EmailIcon></a>
            <a href="https://www.instagram.com/__.iamssj.__/"><InstagramIcon fontSize='medium'></InstagramIcon></a>
            <a href="https://www.facebook.com/shubh.joshi.3323/"><FacebookIcon fontSize='medium'></FacebookIcon></a>
            <h5> Copyright@ 2022. All rights reserved.</h5>
          </div>
        </footer>
      </Container>
    </BrowserRouter>
  );
};

export default App;
