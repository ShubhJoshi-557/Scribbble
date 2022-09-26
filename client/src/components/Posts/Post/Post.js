import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, ButtonBase } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faHeart, faTrash} from '@fortawesome/free-solid-svg-icons';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes ? post.likes.find((like) => like === userId):[];

  const handleLike = async () => {
    if(user?.result){
      dispatch(likePost(post._id));

      if (hasLikedPost) {
        setLikes(post.likes?.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }
    }
    
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId)
        ? (
          <><FontAwesomeIcon icon={faHeart} color="#EA4C89"/>&nbsp;{likes?.length}&nbsp;</>
        ) : (
          <><FontAwesomeIcon icon={faHeart} className={classes.btnColor}/>&nbsp;{likes?.length}&nbsp;</>
        );
    }
    return <><FontAwesomeIcon icon={faHeart} className={classes.btnColor}/>&nbsp;{likes?.length}&nbsp;</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={0}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >

        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.title}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <EditIcon fontSize="default" />
          </Button>
        </div>
        )}      
      </ButtonBase>

      <div className={classes.detailsWrapper}>
        <div className={classes.details}>
          <Link to={`/creators/${post.creator}/${post.name}`} style={{ textDecoration: 'none'}}>
            <Avatar className={classes.purple} alt={post.name} src={post.imageUrl}>{post.name ? post.name.charAt(0):post.imageUrl}</Avatar>
          </Link>
          <Link to={`/creators/${post.creator}/${post.name}`} style={{ textDecoration: 'none'}}>
            <Typography className={classes.name} gutterBottom>&nbsp;{post.name}</Typography>
          </Link>
          <Typography className={classes.time} gutterBottom>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        
        <div style={{ margin: '10px 0px' }} > 
          <Button style={{ padding: '0px', margin: '0px', textTransform: 'none', }} disabled={!user?.result} onClick={handleLike}>
            <Likes onClick={handleLike}/>&nbsp;
          </Button>
          <FontAwesomeIcon icon={faComment} className={classes.btnColor} size="sm"/>&nbsp;{post?.comments?.length}&nbsp;
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <FontAwesomeIcon 
              icon={faTrash} 
              className={classes.delete} 
              color="red" 
              style={{ paddingLeft: '10px' }}  
              onClick={() => {if(window.confirm("Are you sure you want to delete this post? Click 'OK' to continue.")){ dispatch(deletePost(post._id)) };}}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Post;
