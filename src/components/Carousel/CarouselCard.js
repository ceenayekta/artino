import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  Button: {
    marginRight: "auto"
  }
});

export const CarouselCard = ({imgSrc, title, price}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={imgSrc}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"> {title} </Typography>
          <Typography gutterBottom variant="span" component="h2"> {price} </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.Button} size="small" color="primary">
          جزئیات بیشتر
        </Button>
      </CardActions>
    </Card>
  );
}
