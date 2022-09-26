import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { commentPost, likePost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes ? post.likes.find((like) => like === userId):[];
  
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }; 

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FontAwesomeIcon icon={faHeart} size="lg" color="#EA4C89"/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FontAwesomeIcon icon={faHeart} size="lg"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
      }
    return <><FontAwesomeIcon icon={faHeart} size="lg"/>&nbsp;Like</>;
  };
  return (
    <div>
      <div>
        <Button style={{ padding: '0px', margin: '0px', textTransform: 'none' }} disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <div className={classes.commentsOuterContainer}>
        <div className={[classes.commentsInnerContainer, 'style-2'].join(' ')}>
          <Typography gutterBottom variant="h6">{comments.length} Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}: </strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '60%' }} >
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} disabled={!user?.result} variant="outlined" color="secondary" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment.length || !user?.result} className="signInBtn" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
