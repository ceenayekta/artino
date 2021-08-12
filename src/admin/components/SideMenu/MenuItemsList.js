import React from 'react';
import { Link, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    // textAlign: 'right'
  }
}))

export const MenuItemsList = () => {
  const classes = useStyles();

  return (
  <div>
    <Link underline='none' color='textSecondary' href="/admin/dashboard/products">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="محصولات" className={classes.listItemText}/>
      </ListItem>
    </Link>
    <Link underline='none' color='textSecondary' href="/admin/dashboard/categories">
      <ListItem button>
        <ListItemIcon>
          <LabelRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="دسته بندی ها" className={classes.listItemText}/>
      </ListItem>
    </Link>
    <Link underline='none' color='textSecondary' href="/">
      <ListItem button>
        <ListItemIcon>
          <ExitToAppRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="خروج از حساب" className={classes.listItemText}/>
      </ListItem>
    </Link>
  </div>
  )
};

