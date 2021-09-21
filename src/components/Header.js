import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import AuthMenu from "@/components/AuthMenu";
import Image from "next/image";
import logo from "@/images/SoulSynthLogo.png";

import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  tBar: {
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "space-between",
  },
  aBar: {
    backgroundColor: "#000000",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.aBar}>
      <Toolbar className={classes.tBar}>
        <Link href="/">
          <Image src={logo} width={150} height={70} className={classes.sLogo} />
        </Link>
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
