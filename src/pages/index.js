import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Link from "next/link";
import { CssBaseline, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import headphones from "@/images/headphones.jpeg";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#2A2A2A"
  },
  gridForTwo: {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    paddingTop: "50px",
    paddingBottom: "50px",
    width: "1200px"
  },
  headphonesImage: {
    borderRadius: "500px",
  },
  mainTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "50px",
  },
  mainText: {
    color: "#ffffff",
    width: "700px",
    textAlign: "center",
  },
  sectionTitle: {
    backgroundColor: "#c4c4c4",
    textAlign: "center",
    color: "#2A2A2A",
    padding: "5px",
  },
  sectionBody: {
    backgroundColor: "#2A2A2A",
    padding: "30px 100px",
    textAlign: "center",
    color: "#ffffff",
  },
  loginButton: {
    backgroundColor: "#40F113",
    color: "black",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
  },
  signupButton: {
    backgroundColor: "white",
    color: "black",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <CssBaseline />
      <Grid container spacing={8} className={classes.gridForTwo}>
        <Grid item direction={"column"}>
          <Image
            src={headphones}
            width={340}
            height={300}
            className={classes.headphonesImage}
          />
        </Grid>
        <Grid item direction={"column"}>
          <Typography variant="h2" className={classes.mainTitle}>
            SoulSynth
          </Typography>
          <Typography variant="h6" className={classes.mainText}>
            This is a website that allows you to express how you feel and, based
            on that, get songs that fit your current mood.
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.sectionTitle}>
        <Typography variant="h4">HOW DOES IT WORK?</Typography>
      </div>
      <div className={classes.sectionBody}>
        <Typography variant="h6">
          <p>
            SoulSynth connects with Spotify to provide you with music that fits
            your current mood, the only thing that you need to do is sign in and
            tell us how you feel today, we’ll take care of the rest and in no
            time you will be listening to music in our player.
          </p>
        </Typography>
        <Typography variant="h6">
          <p>
            Did we mention that you can delete a song if you don’t like it?
            Because you can! that way we can make sure that you will get only
            good music according to your taste.
          </p>
        </Typography>
        <Typography variant="h6">
          <p>
            Do you really like a playlist? Save it so that you can listen to it
            whenever you feel like it!
          </p>
        </Typography>
      </div>
      <div className={classes.sectionTitle}>
        <Typography variant="h4">WHAT DO YOU NEED?</Typography>
      </div>
      <div className={classes.sectionBody}>
        <Typography variant="h6">
          <p>
            Not much! in fact, you only need a Spotify account to use our site,
            we need to use Spotify in order to deliver the best music directly
            to you without bothering you with pointless downloads, subscriptions
            or long loading times.
          </p>
        </Typography>
      </div>
      <div className={classes.sectionTitle}>
        <Typography variant="h4">GET STARTED!</Typography>
      </div>
      <div className={classes.sectionBody}>
        <Typography variant="h6">
          <p>
            What are you waiting for? click on one of the buttons below or on
            top of the page to start!
          </p>
        </Typography>
        <Typography variant="h6">
          <p>
            If you already linked your Spotify account, we will remeber you. If
            it’s your first time signing up, be sure to allow us to access your
            Spotify account, don’t worry, we won’t touch anything!
          </p>
        </Typography>
        <Grid container spacing={8} className={classes.gridForTwo}>
          <Grid item direction={"column"}>
            <Link href="/login">
              <Button className={classes.loginButton}>Log In!</Button>
            </Link>
          </Grid>
          <Grid item direction={"column"}>
            <Link href="/signIn">
              <Button className={classes.signupButton}>Sign Up!</Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
