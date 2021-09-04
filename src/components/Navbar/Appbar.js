import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Link,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { getOneProduct } from "../../actions/apis";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: theme.minWidth,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
  },
  appBar: {
    maxWidth: theme.maxWidth,
    boxShadow: "0 0 0 0",
  },
  toolBar: {
    padding: "0rem 1rem",
    height: theme.navbarHeight,
    color: theme.palette.primary.main,
    flexGrow: 1,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "2.5rem",
    height: "2.5rem",
  },
  artino: {
    marginLeft: "0.5rem",
    fontSize: "1.75rem",
    lineHeight: "2.5rem",
    fontWeight: "600",
  },
  icons: {
    color: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  divider: {
    width: "100%",
    height: "0.25rem",
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '20rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  cardProductContainer: {
    display: 'flex',
  },
  productImage: {
    width: '4rem',
    height: '4rem',
  },
  productDetails: {
    marginLeft: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Appbar = ({ newAdd, setNewAdd }) => {
  const classes = useStyles();
  const [shoppingCard, setShoppingCard] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  useEffect(() => {
    const storedProducts = JSON.parse(
      window.localStorage.getItem("shoppingCard")
      );
      setShoppingCard(storedProducts);
      if (newAdd !== undefined && setNewAdd !== undefined) {
        setNewAdd(false);
      }
  }, [newAdd, setNewAdd]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearCard = () => {
    window.localStorage.setItem("shoppingCard", JSON.stringify([]));
    setShoppingCard([]);
  };

  const removeFromCard = (index) => {
    const storedProducts = JSON.parse(
      window.localStorage.getItem("shoppingCard")
      );
    storedProducts.splice(index, 1);
    setShoppingCard(storedProducts);
    window.localStorage.setItem("shoppingCard", JSON.stringify(storedProducts));
  }

  const productsInCard = shoppingCard.map((product, index) => (
    <MenuItem className={classes.card}>
      <div className={classes.cardProductContainer}>
        <img alt={product.name} src={product.pictureSrc} className={classes.productImage} />
        <div className={classes.productDetails}>
          <Typography className={classes.name}>{product.name}</Typography>
          <Typography className={classes.price}>
            <b>قیمت: {product.price - product.discount} تومان</b>
          </Typography>
        </div>
      </div>
      <IconButton color="secondary" onClick={() => removeFromCard(index)}>
        <DeleteForeverIcon />
      </IconButton>
    </MenuItem>
  ));

  return (
    <div className={classes.container}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar className={classes.toolBar}>
          <Link
            className={classes.logoContainer}
            underline="none"
            color="textSecondary"
            href="/"
          >
            <img
              className={classes.logo}
              alt="logo"
              src="/asset/Artino-logo.svg"
            />
            <Typography className={classes.artino} variant="h6" noWrap>
              آرتینو
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.icons}>
            <IconButton color="inherit" onClick={handleClick}>
              <Badge badgeContent={shoppingCard.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {productsInCard}
              <li className={classes.card}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.CTAButton}
                  onClick={handleClose}
                >
                  نهایی کردن و پرداخت
                </Button>
                <Button
                  color="secondary"
                  className={classes.CTAButton}
                  onClick={clearCard}
                >
                  خالی کردن سبد خرید
                </Button>
              </li>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
