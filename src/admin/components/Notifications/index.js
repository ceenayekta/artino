import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './css/style.css'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({ notificationText, severity, open, clearUp, duration }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearUp(false)
  };

  // useEffect(() => {
  //   const timer = setInterval(clearUp(false), duration);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className={classes.root}>
      <Snackbar 
        className='container'
        autoHideDuration={duration} 
        open={open} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal:'right' }}
        key={'bottomright'}
      >
        <Alert onClose={handleClose} severity={severity}>
          {notificationText}
        </Alert>
      </Snackbar>
    </div>
  );
}
