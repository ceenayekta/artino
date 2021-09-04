import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { getOneProduct, getProductGallery } from "../actions/apis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    minWidth: theme.minWidth,
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    maxWidth: theme.maxWidth,
    padding: "1rem",
  },
  galleryContainer: {
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "1rem",
  },
  productDetails: {
    paddingLeft: "1rem",
    borderRadius: "1rem",
    maxHeight: "40rem",
  },
  detailsContainer: {
    padding: "2rem",
    backgroundColor: "white",
    width: "100%",
    borderRadius: "1rem",
    maxHeight: "40rem",
    display: "flex",
  },
  details: {
    flex: 5,
  },
  name: {
    marginBottom: "1rem",
    fontSize: "1.75rem",
    fontWeight: "600",
  },
  description: {
    margin: "3rem 1rem",
    fontSize: "1rem",
  },
  specificationsContainer: {
    color: theme.palette.secondary.main,
    display: "flex",
    marginLeft: "1rem",
  },
  point: {
    fontSize: "1rem",
    height: "1.5rem",
  },
  specifications: {
    lineHeight: "1.5rem",
    margin: "0rem 0rem 0.5rem 0.25rem",
  },
  CTAContainer: {
    marginLeft: "1rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    flex: 3,
  },
  CTAButton: {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "500",
    border: "0.125rem solid white",
    width: "100%",
    height: "3.5rem",
    lineHeight: "3.5rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0 0",
    "&:hover": {
      boxShadow: "0 0 0 0",
      backgroundColor: theme.palette.secondary.light,
    },
  },
  inventory: {
    marginBottom: "1.5rem",
    fontSize: "1.25rem",
    color: theme.palette.primary.light,
  },
  discount: {
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "column",
    fontSize: "1.125rem",
    "& b": {
      color: theme.palette.secondary.main,
      fontSize: "1.25rem",
    },
  },
  price: {
    marginBottom: "0.5rem",
    fontSize: "1.25rem",
    color: theme.palette.secondary.main,
  },
}));

export const ShoppingPage = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAdd, setNewAdd] = useState(false);

  useEffect(() => {
    const urlProductId = window.location.href.split("#")[1];
    getOneProduct(urlProductId)
      .then((res) => {
        setProduct(res.data);
        getProductGallery(false, urlProductId)
          .then((resp) => {
            setGallery(resp.data);
            setLoading(false);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCard = () => {
    const storedProducts = JSON.parse(localStorage.getItem("shoppingCard"));
    if (!storedProducts.includes(product)) {
      storedProducts.push(product);
      setNewAdd(true);
    }
    window.localStorage.setItem("shoppingCard", JSON.stringify(storedProducts));
  };

  const galleryImages = gallery.map((img) => (
    <SwiperSlide key={img._id} className={classes.SwiperSlide}>
      <img alt={img.alt} src={img.path} className={classes.galleryImage} />
    </SwiperSlide>
  ));

  return (
    <div className={classes.root}>
      <Navbar newAdd={newAdd} setNewAdd={setNewAdd} />
      <main className={classes.main}>
        <Grid container className={classes.container}>
          <Grid item xs={4} container className={classes.galleryContainer}>
            <Swiper
              className={classes.gallerySwiper}
              slidesPerView={1}
              spaceBetween={16}
              pagination
              navigation
            >
              <SwiperSlide className={classes.SwiperSlide}>
                <img
                  alt={product.name}
                  src={product.pictureSrc}
                  className={classes.galleryImage}
                />
              </SwiperSlide>
              {galleryImages}
            </Swiper>
          </Grid>
          <Grid item xs={8} container className={classes.productDetails}>
            {loading ? null : (
              <div className={classes.detailsContainer}>
                <div className={classes.details}>
                  <Typography className={classes.name}>
                    {product.name}
                  </Typography>
                  <Divider variant="middle" />
                  <Typography className={classes.description}>
                    {product.description}
                  </Typography>
                  {product.specifications.split(" ").map((specification) => (
                    <div className={classes.specificationsContainer}>
                      <FiberManualRecordIcon className={classes.point} />
                      <Typography className={classes.specifications}>
                        {specification}
                      </Typography>
                    </div>
                  ))}
                </div>
                <div className={classes.CTAContainer}>
                  {product.inventory === 0 && (
                    <>
                      <Typography className={classes.price}>
                        قیمت پیشین: {product.price} تومان
                      </Typography>
                      <Typography className={classes.inventory}>
                        وضعیت: ناموجود
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.CTAButton}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={addToCard}
                        disabled
                      >
                        افزودن به سبد خرید
                      </Button>
                    </>
                  )}
                  {product.inventory !== 0 && product.discount !== 0 && (
                    <>
                      {product.discount !== 0 ? (
                        <Typography className={classes.discount}>
                          <strike>قیمت: {product.price} تومان</strike>
                          <b>
                            با تخفیف: {product.price - product.discount} تومان
                          </b>
                        </Typography>
                      ) : (
                        <Typography className={classes.price}>
                          <b>قیمت: {product.price} تومان</b>
                        </Typography>
                      )}
                      <Typography className={classes.inventory}>
                        وضعیت: {product.inventory} عدد موجود در انبار
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.CTAButton}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={addToCard}
                      >
                        افزودن به سبد خرید
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};
