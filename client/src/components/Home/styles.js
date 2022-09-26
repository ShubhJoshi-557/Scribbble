import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';


export default makeStyles((theme) => ({
  appBarSearch: {
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  TypographyH1:{
    color: '#fff',
    paddingTop:'110px',
    textAlign:'center',
    fontSize:'50px',
    fontWeight:700,
  },
  box:{
    display: 'flex',
    justifyContent: 'center',
  },
  searchButton:{
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
  TypographyH2:{
    color: '#fff',
    padding:'20px',
    textAlign:'center',
    fontSize:'20px',
    fontWeight: 500,
  },

  pagination: {
    maxWidth:'500px',
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    padding:'80px',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
