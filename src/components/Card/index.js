import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "1rem",
    borderRadius: "1rem",
    "& button": {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      minHeight: "25rem",
    },
  },
  cardMedia: {
    flex: 1,
  },
  cardContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
    flex: 1,
    "& p": {
      alignSelf: "end",
    },
  },
  inventory: {
    fontSize: "1.25rem",
    color: theme.palette.primary.light,
  },
  discount: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.125rem",
    "& b": {
      color: theme.palette.secondary.main,
      fontSize: "1.25rem",
    },
  },
  price: {
    fontSize: "1.25rem",
    color: theme.palette.secondary.main,
  },
}));

const ProductCard = ({
  name,
  pictureSrc,
  specifications,
  price,
  discount,
  inventory,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          image={pictureSrc}
          title={name}
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography gutterBottom variant="body2" component="h2">
              {specifications}
            </Typography>
          </div>
          {inventory === 0 && (
            <Typography className={classes.inventory}>
              <b>ناموجود</b>
            </Typography>
          )}
          {inventory !== 0 && discount !== 0 && (
            <Typography className={classes.discount}>
              <strike>{price} تومان</strike>
              <b>{price - discount} تومان</b>
            </Typography>
          )}
          {inventory !== 0 && discount === 0 && (
            <Typography className={classes.price}>
              <b>{price} تومان</b>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
