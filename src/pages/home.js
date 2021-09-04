import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import staticData from "../staticData.json";
import { Slider, CarouselCard, CarouselImage } from "../components/Carousel";
import { getProducts } from "../actions/apis";
import Navbar from "../components/Navbar";
import { Button, Link, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: theme.minWidth,
  },
  main: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  slider: {
    borderRadius: "1rem",
    height: "40vw",
    marginBottom: "1.5rem",
    maxWidth: theme.maxWidth,
    minHeight: "35rem",
    maxHeight: "45rem",
  },
  SwiperSlide: {
    borderRadius: "1rem",
  },
  CarouselImage: {
    "& .MuiImageListItem-item": {
      borderRadius: "1rem",
    },
  },
  productsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    height: "40vw",
    minHeight: "35rem",
    maxHeight: "45rem",
    width: "calc(100% - 1rem)",
    maxWidth: `calc(${theme.maxWidth} - 1rem)`,
    borderRadius: "1rem",
    paddingRight: "1rem",
  },
  productsCTA: {
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "35%",
    height: "80%",
  },
  CTAText: {
    maxWidth: "70%",
    textAlign: "center",
    fontWeight: "800",
  },
  CTAImage: {
    width: "14rem",
  },
  CTAButton: {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "500",
    border: "0.125rem solid white",
    width: "10rem",
    height: "3.5rem",
    lineHeight: "3.5rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0 0",
    "&:hover": {
      boxShadow: "0 0 0 0",
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export const HomePage = () => {
  const classes = useStyles();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts("/products")
      .then((res) => {
        setProductsList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const sliders = staticData.slider.map((item) => {
    return (
      <SwiperSlide key={item.title} className={classes.SwiperSlide}>
        <CarouselImage
          className={classes.CarouselImage}
          title={item.title}
          imgSrc={item.image}
        />
      </SwiperSlide>
    );
  });

  const lastTenProducts = productsList.slice(-10).reverse();
  const products = lastTenProducts.map((product) => {
    return (
      <SwiperSlide key={product._id} className={classes.SwiperSlide}>
        <Link underline="none" href={`/shopping/#${product._id}`}>
          <CarouselCard
            title={product.name}
            price={product.price}
            imgSrc={product.pictureSrc}
            imgAlt={product.name}
          />
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.main}>
        <Slider
          // data={staticData.slider}
          classeName={classes.slider}
          slidesPerView={1}
          spaceBetween={30}
          loop
          pagination
          navigation
        >
          {sliders}
        </Slider>
        <div className={classes.productsContainer}>
          <div className={classes.productsCTA}>
            <Typography variant="h4" className={classes.CTAText}>
              لیست محصولات آماده ارسال
            </Typography>
            <img
              alt="home-CTA"
              src="/asset/home-CTA.svg"
              className={classes.CTAImage}
            />
            <Link underline="none" href="/products">
              <Button
                variant="contained"
                color="secondary"
                className={classes.CTAButton}
                endIcon={<ArrowBackIosIcon />}
              >
                مشاهده همه
              </Button>
            </Link>
          </div>
          <Slider
            className={classes.productsSlider}
            spaceBetween={16}
            pagination={false}
            navigation
            slidesPerView={4}
          >
            {products}
          </Slider>
        </div>
      </main>
      <Footer />
    </div>
  );
};
