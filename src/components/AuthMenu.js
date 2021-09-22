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
  },
  registerPageButton: {
    backgroundColor: "#40F113",
    color: "black",
    marginBottom: "5px",
    borderRadius: "25px",
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#2A2A2A",
    color: "#ffffff",
    borderRadius: "25px",
    textAlign: "center",
    borderColor: "#ffffff",
  },
  signUpButton: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "20px",
    textAlign: "center",
    borderColor: "#2A2A2A",
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
        <Grid container>
          <Grid item className={classes.signUpButton}>
            <Link href="signIn">
              <Button>Sign Up</Button>
            </Link>
          </Grid>
          <Grid item direction={"row"} className={classes.registerPageButton}>
            <Link href="/login">
              <Button>Log In!</Button>
            </Link>
          </Grid>
          <Grid item direction={"row"}>
            <Link href="/">
              <Button className={classes.goBackButton}>Go Home!</Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;
