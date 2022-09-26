
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      outline:'none',
      margin:'none',
      // margin: theme.spacing(1),
    },
  },
  box: {
    display:'flex',
    justifyContent:'center',

  },
  paper: {
    display:'flex',
    maxWidth:'500px',
    padding: theme.spacing(2),
    margin:'50px auto',
    borderRadius:'10px',
    justifyContent:'center',
  },

  typo: {
    maxWidth:'400px',
    paddingBottom:'20px',
    fontWeight:'200',
  },
  form: {
    // padding: '50px',
    margin:'20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
    padding: '10px 30px',
    borderRadius:'10px',
  },
  fileInputMain: {
    backgroundColor:'#000',
  },
  
  buttonSubmit: {
    textTransform: 'none',
    backgroundColor:'#EA4C89',
    maxWidth:'150px',
    margin: 10,
    borderRadius: 20,
  },
  buttonClear: {
    textTransform: 'none',
    border:'solid 1px',
    color:'#EA4C89',
    backgroundColor:'#fff',
    maxWidth:'150px',
    margin: 10,
    borderRadius: 20,
    '&:hover':{
      color:'#fff',
      border:'none',
    }
  },
}));
