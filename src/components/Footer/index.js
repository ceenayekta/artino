import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    minWidth: theme.minWidth,
    height: theme.footerHeight,
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    lineHeight: "3rem",
    fontWeight: "500",
    color: "white",
    marginTop: "auto",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      Artino 2021 - All Rights Reserved ©
    </footer>
  );
};

export default Footer;
