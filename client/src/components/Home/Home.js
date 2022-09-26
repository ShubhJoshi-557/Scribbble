import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [sortBy, setSortby] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags || sortBy) {
      dispatch(getPostsBySearch({ search, tags: tags.join(','), sortBy}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}&sortBy=${sortBy}`); 
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  console.log('search',search);

  return (
    <Grow in>
      <Container maxWidth="xl">
        
        <AppBar elevation={0} className={[classes.appBarSearch, 'searchBar'].join(' ')} position="static" color="inherit">
          <Typography className={classes.TypographyH1} >Search Scribbble</Typography>
          <Typography className={classes.TypographyH2}>Projects from thousands of inspirational Developers</Typography>
          <div class="search-box">
            <input 
              onKeyDown={handleKeyPress} 
              className="searchBox name" 
              type="text" 
              name="search" 
              placeholder="Search Name..." 
              fullwidth 
              defaultValue={searchQuery!='none'?searchQuery:[]} 
              onChange={(e) => setSearch(e.target.value)} />
            <ChipInput
              className="searchBox tag"
              value={tags}
              color="secondary"
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Tags"
              variant="outlined"
            />

            <select id="mySelect" onChange={(e) => {
              console.log(e.target.value);
              setSortby(e.target.value);
              }} 
            >
              <option value="" selected disabled hidden>SortBy</option>
              <option value="latest">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="mostPopular">Most Popular</option>
              <option value="leastPopular">Least Popular</option>
            </select>

            <Button onClick={searchPost} className={[classes.searchButton, 'signInBtn'].join(' ')} variant="contained" color="primary"> <SearchIcon/> </Button>
          </div>
        </AppBar>
        
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>

        {(!searchQuery && !tags.length) && (
          <Container maxWidth="xl" className={classes.box}>
            <Paper className={classes.pagination} elevation={0}>
              <Pagination page={page} />
            </Paper>
          </Container>
        )}

        <Form currentId={currentId} setCurrentId={setCurrentId} />

      </Container>
    </Grow>
  );
};

export default Home;
