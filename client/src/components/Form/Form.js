import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', demoUrl:'', codeUrl:'', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', demoUrl:'', codeUrl:'', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name, imageUrl: user?.result?.imageUrl}, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name, imageUrl: user?.result?.imageUrl }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.typo} variant="h6" align="center">
          Please Sign In to upload your own projects and like other's projects.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <div className={classes.box}>
      <Paper className={classes.paper} elevation={10}>
        <form autoComplete="off" noValidate className={[`${classes.root} ${classes.form}`, classes.form].join(' ')} onSubmit={handleSubmit}>
          <Typography className={classes.typo} variant="h6">{currentId ? `Editing "${post?.title}"` : 'Share a Project'}</Typography>
          <TextField name="title" className={classes.typo} color="secondary" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" className={classes.typo} color="secondary" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div style={{ marginBottom:'15px', padding: '5px 30px', width: '100%' }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              color="secondary"
              fullWidth
              value={postData.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>
          <TextField name="codeUrl" className={classes.typo} color="secondary" variant="outlined" label="Code Url" fullWidth value={postData.codeUrl} onChange={(e) => setPostData({ ...postData, codeUrl: e.target.value })} />
          <TextField name="demoUrl" className={classes.typo} color="secondary" variant="outlined" label="Demo Url" fullWidth value={postData.demoUrl} onChange={(e) => setPostData({ ...postData, demoUrl: e.target.value })} />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          
          <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
          <Button className={classes.buttonClear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    </div>
    
  );
};

export default Form;
