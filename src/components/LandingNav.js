import { AppBar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import logo from "@/images/ghostSoul.png";
import Image from "next/image";

const useStyles = makeStyles(() => ({
  background: {
    height: "720px",
    backgroundColor: "#2A2A2A",
  },
  logo: {
    maxHeight: "10px",
    maxWidth: "10px",
  },
}));

export default function Nav() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <AppBar>
        <Link href="/" passHref>
          <Image
            className={classes.logo}
            src={logo}
            height={100}
            width={100}
            alt="No image found"
          />
        </Link>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            I already have an account
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Sign up
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
      </AppBar>
    </div>
  );
}
