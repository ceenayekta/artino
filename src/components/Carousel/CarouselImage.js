import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ImageListItem, ImageListItemBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ImageListItem: {
    fontWeight: "600",
    width: "100%",
    height: "100%",
  },
  ImageListItemBar: {
    height: "5rem",
  },
}));

export const CarouselImage = ({ className, imgSrc, title }) => {
  const classes = useStyles();
  return (
    <ImageListItem
      component="div"
      className={`${className} ${classes.ImageListItem}`}
    >
      <img src={imgSrc} alt={title} />
      <ImageListItemBar title={title} className={classes.ImageListItemBar} />
    </ImageListItem>
  );
};
