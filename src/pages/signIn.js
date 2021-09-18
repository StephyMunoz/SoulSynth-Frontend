import Image from "next/image";
import Button from "@material-ui/core/Button";
import styles from "@/styles/register.module.css";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import spotifyLogo from "@/images/spotify.png";
import React from "react";
import Footer from "@/components/Footer";
import Register from "./register";
import { signIn, useSession } from "next-auth/client";
import withoutAuth from "../hocs/withoutAuth";

const SignIn = () => {
  const [session] = useSession();

  return (
    <div className={styles.RegisterPage}>
      {/*<SoulSynthNav />*/}
      {!session ? (
        <div>
          <Grid
            spacing={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item direction="column">
              <h1>Link your Spotify account to sign up...</h1>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-around" align="middle">
            <Grid direction="column">
              <Grid direction="row" justify="space-around" align="middle">
                <p>
                  This site uses Spotify to play custom music <br />
                  just for you, to make that happen you need
                  <br />
                  to log in to your Spotify account...
                </p>
              </Grid>
              <Grid
                direction="row"
                justify="space-around"
                align="middle"
                className={styles.RegisterPageButton}
              >
                <Button
                  onClick={() =>
                    signIn("https://accounts.spotify.com/authorize")
                  }
                >
                  Sign in with Spotify
                  <Image
                    //id="landing_logo"
                    height={25}
                    width={25}
                    src={spotifyLogo}
                    alt="No image found"
                  />
                </Button>
              </Grid>
            </Grid>
            <div className={styles.RegisterPageDivider}>
              <Divider type="vertical" />
            </div>
            <Grid direction="column" span={8}>
              <Grid direction="row" justify="space-around" align="middle">
                <p>
                  ...Or if you don’t have a Spotify account,
                  <br />
                  make one by clicking on this button!
                  <br />
                  Don’t worry, we’ll wait.
                </p>
              </Grid>
              <Grid
                direction="row"
                justify="space-around"
                align="middle"
                className={styles.RegisterPageButton}
              >
                <Button>
                  Create Spotify Account
                  <Image
                    //id="landing_logo"
                    height={25}
                    width={25}
                    src={spotifyLogo}
                    alt="No image found"
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            spacing={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={styles.RegisterPageFooter}
          >
            <Footer />
          </Grid>
        </div>
      ) : (
        <div>
          <Register />
        </div>
      )}
    </div>
  );
};

export default withoutAuth(SignIn);
