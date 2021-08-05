import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    borderLeft: "2px solid blue"
  },
}));

export const AutoGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Typography component="div" className={classes.list}>دسته بندی</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>کتابخانه</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>گالری ها</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>فروشگاه ها</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>هنرمندان برگزیده</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>رویداد ها</Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" className={classes.list}>ارتباط با ما</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
