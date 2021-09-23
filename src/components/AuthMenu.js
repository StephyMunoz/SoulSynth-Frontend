import React from "react";
import Link from "next/link";
import ProfileMenu from "@/components/ProfileMenu";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  buttonGridDiv: {
    padding: "5px",
    width: "300px",
    display: "flex",
    textAlign: "center"
  },
  registerPageButton: {
    margin: "0px 15px",
    backgroundColor: "#40F113",
    color: "black",
    borderRadius: "25px",
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#2A2A2A",
    color: "#ffffff",
    borderRadius: "25px",
    textAlign: "center",
    borderColor: "#ffffff",
    margin: "0px 15px"
  },
  signUpButton: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "20px",
    textAlign: "center",
    borderColor: "#2A2A2A",
    margin: "0px 15px"
  },
}));

const AuthMenu = () => {
  const { user } = useAuth();
  const classes = useStyles();
  if (user === null) {
    return <Skeleton variant="rect" width={100} height={30} />;
  }

  if (!user) {
    return (
      <div className={classes.buttonGridDiv}>
        <Grid container spacing={3}>
          <Grid item direction={"column"} className={classes.signUpButton}>
            <Link href="signIn">
              <Button>Sign Up</Button>
            </Link>
          </Grid>
          <Grid item direction={"column"} className={classes.registerPageButton}>
            <Link href="/login">
              <Button>Log In!</Button>
            </Link>
          </Grid>
          <Grid item direction={"column"}>
            <Link href="/">
              <Button className={classes.goBackButton}>Home</Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;
