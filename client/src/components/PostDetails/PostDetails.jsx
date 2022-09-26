import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button, Avatar } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper style={{ padding: '20px', margin: '30px', borderRadius: '15px' }} elevation={6} className={classes.loadingPaper}>
        <CircularProgress color="secondary" size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 5);

  return (
    <Paper style={{ padding: '20px', margin: '30px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#EA4C89' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" style={{ marginBottom:'10px', }}>
          <div style={{display:'flex', justifyContent:'left'}}>
            <Link to={`/creators/${post.creator}/${post.name}`} style={{ textDecoration: 'none'}}>
              <Avatar className={classes.purple} alt={post.name} src={post.imageUrl}>{post.name ? post.name.charAt(0):post.imageUrl}</Avatar>
            </Link>
            <Link to={`/creators/${post.creator}/${post.name}`} style={{ textDecoration: 'none', color: '#EA4C89', paddingLeft:'10px', paddingTop:'10px',}}>
              {` ${post.name}`}
            </Link>
          </div>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h6" component="p" style={{ marginBottom:'0px', }}>Description:</Typography>
          <Typography gutterBottom variant="body1" component="p"> {post.message}</Typography>
          <Typography variant="body1">Posted&nbsp;{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Button className={classes.viewCode} variant="contained" size="large" href={post.codeUrl}>View Code</Button>
          <Button className={classes.viewDemo} variant="contained" size="large" href={post.demoUrl}>View Demo</Button>
          {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>  */}
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ padding: '20px', margin: '20px', cursor: 'pointer', border:'none', borderRadius:'10px', boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Divider style={{ margin: '5px 0' }} />
                <div style={{display:'flex', justifyContent:'left'}}>
                  <Avatar style={{maxWidth:'20px', maxHeight:'20px', bottom:'-10px'}} alt={post.name} src={post.imageUrl}>{post.name ? post.name.charAt(0):post.imageUrl}</Avatar>
                  <Link to={`/creators/${post.creator}/${post.name}`} style={{ textDecoration: 'none', color: '#EA4C89', paddingLeft:'10px', paddingTop:'10px',}}>
                    {` ${post.name}`}
                  </Link>
                </div>
                <Divider style={{ margin: '5px 0' }} />
                <><FontAwesomeIcon icon={faHeart} size="sm"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                <Divider style={{ margin: '5px 0' }} />
                <img src={selectedFile} style={{ borderRadius:'10px'}} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
