import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageListItem, ImageListItemBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ImageListItem: {
    width: "100%",
    height: "100%",
  },
  ImageListItemBar: {
    height: "80px"
  }
}));

export const CarouselImage = ({ imgSrc, title}) => {
  const classes = useStyles();
  return (
    <ImageListItem component="div" className={classes.ImageListItem}>
      <img src={imgSrc} alt={title} />
      <ImageListItemBar title={title}  className={classes.ImageListItemBar} />
    </ImageListItem>
  );
}
