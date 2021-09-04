import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Menu, MenuItem } from "@material-ui/core";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { getCategories } from "../../actions/apis";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.minWidth,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
  },
  menuContainer: {
    minWidth: theme.minWidth,
    width: "100%",
    maxWidth: theme.maxWidth,
    flexGrow: 1,
  },
  button: {
    height: theme.navbarMenuHeight,
    position: "relative",
    fontSize: "1rem",
    fontWeight: "600",
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.secondary,
    boxShadow: "0 0 0 0",
    borderRadius: "0px",
    "&:hover": {
      boxShadow: "0 0 0 0",
      backgroundColor: theme.palette.primary.light,
      "& $selector": {
        width: "100%",
      },
    },
  },
  buttonIcon: {
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "0.5rem",
  },
  selector: {
    backgroundColor: theme.palette.primary.main,
    height: "0.25rem",
    width: "0rem",
    position: "absolute",
    bottom: "0",
    transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 0)",
  },
  openMenu: {
    width: "100%",
  },
  menu: {
    "& div": {
      "& ul": {
        minWidth: "14rem",
        borderRadius: "0rem !important",
        padding: "0rem",
      },
    },
  },
  menuItem: {
    padding: "0rem 2rem 0rem 1rem",
    lineHeight: "3rem",
    fontSize: "1rem",
    fontWeight: "600",
    position: "relative",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $menuSelector": {
        height: "100%",
      },
    },
  },
  menuItemIcon: {
    width: "1rem",
    height: "1rem",
    marginRight: "0.5rem",
  },
  menuSelector: {
    backgroundColor: theme.palette.primary.main,
    width: "0.25rem",
    height: "0rem",
    position: "absolute",
    right: "0",
    transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 0)",
  },
  openMenuButton: {
    height: "100%",
  },
}));

export const NavbarMenu = () => {
  const classes = useStyles();

  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    getCategories("/products")
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMainMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleMainMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuOpen(false);
  };

  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const handleChildMenuOpen = (event, index, categoryId) => {
    setSubMenuAnchorEl(event.currentTarget);
    setSubMenuOpen(index);
    setSelectedCategoryId(categoryId);
  };
  const handleChildMenuClose = () => {
    setSubMenuAnchorEl(null);
    setSubMenuOpen(false);
  };

  const subCategories = categoriesList.filter(
    (category) => category.parentId === selectedCategoryId
  );
  const subMenuItems = subCategories.map((category) => (
    <MenuItem
      key={category._id}
      className={classes.menuItem}
      onClick={() => {
        handleChildMenuClose();
        handleMainMenuClose();
      }}
    >
      {category.name}
    </MenuItem>
  ));

  const mainCategories = categoriesList.filter(
    (category) => category.isMainCategory
  );
  const menuItems = mainCategories.map((category, index) => (
    <div>
      <MenuItem
        key={category._id}
        className={classes.menuItem}
        onClick={(event) => handleChildMenuOpen(event, index, category._id)}
      >
        <FiberManualRecordRoundedIcon className={classes.menuItemIcon} />
        <span>{category.name}</span>
        <span
          className={`${classes.menuSelector} ${
            subMenuOpen === index && classes.openMenuButton
          }`}
        ></span>
      </MenuItem>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={subMenuAnchorEl}
        keepMounted
        open={Boolean(subMenuAnchorEl)}
        onClose={handleChildMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {subMenuItems}
      </Menu>
    </div>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.menuContainer}>
        <Button
          className={classes.button}
          onClick={handleMainMenuOpen}
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <MenuRoundedIcon className={classes.buttonIcon} />
          <span>دسته بندی ها</span>
          <span
            className={`${classes.selector} ${menuOpen && classes.openMenu}`}
          ></span>
        </Button>
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMainMenuClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {menuItems}
        </Menu>

        <Link underline="none" href="/products">
          <Button className={classes.button} variant="contained">
            <StorefrontRoundedIcon className={classes.buttonIcon} />
            <span>محصولات</span>
            <span className={classes.selector}></span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarMenu;
