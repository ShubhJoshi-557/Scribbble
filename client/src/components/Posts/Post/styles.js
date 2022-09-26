import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '75%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    borderRadius:'10px',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    height: '100%',
    position: 'relative',
  },
  btnColor:{
    color:'#9E9EA7',
  },
  overlay: {
    position: 'absolute',
    bottom: '-100%',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    bottom: '-100%',
    right: '0px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    justifyContent: 'left',
  },
  name: {
    color: '#000',
    padding: '10px 0px',
    fontWeight:'600',
    fontSize:'15px'
  },
  time: {
    padding: '15px 5px',
    fontWeight:'100',
    fontSize:'10px'
  },
  purple: {
    padding:'0px',
    fontSize:'10px',
    margin: '10px 5px 10px 0px',
    height: '20px',
    width: '20px',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  cardActions: {
    height:'50px',
    padding: '0px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  delete:{
    paddingRight:'5px',
    cursor:'pointer',
  },
  cardAction: {
    borderRadius:'20px',
    display: 'block',
    textAlign: 'initial',
    '&:hover':{
      backgroundColor:'#fff',
      '& $media':{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        transition: '0.5s',
      },
      '& $overlay':{
        bottom: '10px',
        transition: '0.5s',
      },
      '& $overlay2':{
        bottom: '10px',
        transition: '0.5s',
      }
    },
  },
});
