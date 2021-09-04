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
  Divider,
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
  badge: {
    '& .MuiBadge-badge': {
      color: 'white',
    },
  },
  divider: {
    margin: '1rem',
  },
  card: {
    padding: '0.5rem 1rem',
    minWidth: '20rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardProductContainer: {
    display: 'flex',
  },
  productImage: {
    width: '4rem',
    height: '4rem',
  },
  emptyCard: {
    width: '100%',
    textAlign: 'center',
    marginTop: '10px',
    color: theme.palette.secondary.light,
  },
  productDetails: {
    marginLeft: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  cardButtonsContainer: {
    padding: '1.5rem 1rem 1rem 1rem',
    display: 'flex',
    minWidth: '20rem',
  },
  payButton: {
    fontWeight: '600',
    fontSize: '1rem',
    height: '3rem',
    color: 'white',
    flex: 4,
  },
  clearButton: {
    fontWeight: '600',
    fontSize: '1rem',
    height: '3rem',
    flex: 3,
    marginLeft: '1rem',
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
      <div className={classes.cardContainer}>
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
      </div>
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
              <Badge badgeContent={shoppingCard.length} color="secondary" className={classes.badge}>
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
              {shoppingCard.length <= 0 && (
                <MenuItem className={classes.card}>
                  <Typography className={classes.emptyCard}>سبد خرید شما خالی است.</Typography>
                </MenuItem>
              )}
              {productsInCard}
              <Divider variant="middle" className={classes.divider} />
              <MenuItem className={`${classes.card} `}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.payButton}
                  onClick={handleClose}
                >
                  نهایی کردن و پرداخت
                </Button>
                <Button
                  color="primary"
                  className={classes.clearButton}
                  onClick={clearCard}
                >
                  حذف همه
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
