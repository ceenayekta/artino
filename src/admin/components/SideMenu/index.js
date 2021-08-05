import { Divider, Drawer, IconButton, List } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { MenuItemsList } from './MenuItemsList';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerButton: {
      transform: 'rotate(180deg)'
    },
}));

const SideMenu = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
    return (
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className={classes.drawerButton} />
          </IconButton>
        </div>
        <Divider />
        <List><MenuItemsList /></List>
      </Drawer>
    )
}

export default SideMenu
