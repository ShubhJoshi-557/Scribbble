import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import Form from '../Form/Form';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

import useStyles from './styles';

const CreatorOrTag = () => {
  const { creatorID, name } = useParams();
  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(creatorID));
    }
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <div className={classes.box}>
      <Typography variant="body1">{location.pathname.startsWith('/tags')?'Tag':'Name'}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      <Typography variant="h2">{location.pathname.startsWith('/tags')?'#':''}{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress color='secondary'/> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
      {(user?.result._id?user?.result._id:user?.result.googleId) === creatorID?
        <>
          <Divider style={{ margin: '20px 0 50px 0' }} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </>:<></>
      }
    </div>
  );
};

export default CreatorOrTag;
