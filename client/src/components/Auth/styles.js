import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:'10px',
    maxWidth:'1000px',
    justifyContent:'center',
    // padding: theme.spacing(5),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  bg:{
    padding:'50px',
    backgroundImage: 'linearGradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',
  },
  grid:{
    display:'flex',
    margin:'0',
  },
  art:{
    flexGrow:'1',
    padding:'50px',
    maxWidth:'100em',
    borderRadius:'10px',
    backgroundColor: '#F1CDD7',
  },
  typo1:{
    padding:'20px',
    fontSize:'50px',
    fontWeight:'100',
  },
  typo2:{
    color:'#865C8E',
    padding:'20px',
    fontSize:'30px',
    fontWeight:'700',
  },
  mainform:{
    display: 'flex',
    justifyContent: 'center',
    maxWidth:'400px',
    padding:'30px',
    margin:'auto',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    borderRadius:'10px',
    width:'300px',
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    textTransform: 'none',
    borderRadius:'10px',
    width:'200px',
    color:'#fff',
    backgroundColor:'#3684EB',
    margin: theme.spacing(0, 0, 2),
  },
  routeBtn:{
    textTransform: 'none',
  },
}));
