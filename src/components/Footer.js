import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  footer: {
    textAlign: "center",
    backgroundColor: "#2A2A2A",
    paddingBottom: "10px",
    color: "white"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="subtitle2">
        SoulSynth ©2021
      </Typography>
    </div>
  );
};

export default Footer;
