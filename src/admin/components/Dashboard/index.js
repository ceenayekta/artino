import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, 
  Box, 
  Typography, 
  Container, 
  Link } from '@material-ui/core';
import Navbar from '../Navbar';
import SideMenu from '../SideMenu';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Artino
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    overflowY: 'auto',
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  footer: {
    float: "bottom",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }
}));

export default function Dashboard({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} drawerWidth={drawerWidth} />
      <SideMenu handleDrawerClose={handleDrawerClose} open={open}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        <footer className={classes.footer}>
          <Box pt={4} pb={4}>
            <Copyright />
          </Box>
        </footer>
      </main>
    </div>
  );
}