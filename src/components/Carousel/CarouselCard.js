import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    height: "22rem",
    width: "12rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0 0",
  },
  cardArea: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "column",
  },
  image: {
    maxHeight: "12rem",
    flex: 3,
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "start",
    flexDirection: "column",
    flex: 2,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "",
    lineHeight: "2.5rem",
    flex: 1,
  },
  price: {
    fontSize: "1.25rem",
    fontWeight: "600",
    lineHeight: "2.5rem",
    flex: 1,
  },
});

export const CarouselCard = ({ imgSrc, imgAlt, title, price }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardArea}>
        <CardMedia
          component="img"
          alt={imgAlt}
          image={imgSrc}
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title}> {title} </Typography>
          <Typography className={classes.price}> {price} تومان </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
