import { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Slider,
  Switch,
  Grid,
  Link,
} from "@material-ui/core";
import { getProducts } from "../actions/apis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import ProductCard from "../components/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    maxWidth: theme.maxWidth,
    display: "flex",
  },
  filtersContainer: {
    maxHeight: "100%",
    width: "20%",
    minWidth: "16rem",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 0rem",
    overflow: "auto",
  },
  filters: {
    padding: "1.5rem",
    textAlign: "center",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },
  filtersText: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: theme.palette.primary.main,
  },
  switchFilter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceRange: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  pickedRange: {
    color: theme.palette.primary.main,
    width: "100%",
    fontSize: "1rem",
    fontWeight: "500",
  },
  productsContainer: {
    maxHeight: "100%",
    width: "80%",
    minWidth: `calc(${theme.minWidth} - 16rem)`,
  },
  products: {
    maxHeight: "100%",
    width: "100%",
    padding: "1.5rem 0rem 1rem 1rem",
  },
}));

export const ProductsPage = () => {
  const classes = useStyles();
  const [productsList, setProductsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highestPrice, setHighestPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [priceRange, setPriceRange] = useState([0, highestPrice]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res.data;
        setProductsList(list);
        setFilteredList(list);
        setLoading(false);
        let hp = 0;
        for (let i = 0; i < list.length; i++) {
          const price = list[i].price / 1000;
          if (price > hp) {
            hp = price;
            setHighestPrice(Math.ceil(price));
            setPriceRange([0, Math.ceil(price)]);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const prods = filteredList.map((product) => {
      return (
        <Grid key={product._id} item xs={6} sm={6} md={4} lg={4}>
          <Link underline="none" href={`/shopping/#${product._id}`}>
            <ProductCard
              name={product.name}
              pictureSrc={product.pictureSrc}
              specifications={product.specifications}
              price={product.price}
              discount={product.discount}
              inventory={product.inventory}
            />
          </Link>
        </Grid>
      );
    });
    setProducts(prods);
  }, [filteredList]);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    if (checked) {
      setFilteredList(productsList);
    } else {
      setFilteredList(
        filteredList.filter((product) => product.inventory !== 0)
      );
    }
  };

  const onRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const onRangeChangeCommitted = (event, newValue) => {
    setFilteredList(
      productsList.filter(
        (product) =>
          product.price >= newValue[0] * 1000 &&
          product.price <= newValue[1] * 1000
      )
    );
  };
  const priceValue = (priceRange) => {
    return `${priceRange} هزار تومان`;
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.filtersContainer}>
            <Paper className={classes.filters} elevation={0}>
              <Typography
                className={classes.filtersText}
                id="range-slider"
                gutterBottom
              >
                جستجوی محصول
              </Typography>
              <SearchBox placeholder="نام محصول یا دسته بندی" />
            </Paper>
            <Paper
              className={`${classes.filters} ${classes.switchFilter}`}
              elevation={0}
            >
              <Typography className={classes.filtersText} id="range-slider">
                فقط کالاهای موجود
              </Typography>
              <Switch checked={checked} onChange={toggleChecked} />
            </Paper>
            <Paper className={classes.filters} elevation={0}>
              <Typography
                className={classes.filtersText}
                id="range-slider"
                gutterBottom
              >
                محدوده قیمت مورد نظر
              </Typography>
              <Slider
                value={priceRange}
                onChangeCommitted={onRangeChangeCommitted}
                onChange={onRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={priceValue}
                max={highestPrice}
                color="secondary"
              />
              <Paper elevation={0} className={classes.priceRange}>
                <Paper elevation={0} className={classes.pickedRange}>
                  از {priceRange[0]} هزار تومان
                </Paper>
                <Paper elevation={0} className={classes.pickedRange}>
                  تا {priceRange[1]} هزار تومان
                </Paper>
              </Paper>
            </Paper>
          </div>
          <div className={classes.productsContainer}>
            <Grid container className={classes.products} spacing={2}>
              {products}
            </Grid>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
