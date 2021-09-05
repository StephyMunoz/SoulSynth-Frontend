import Image from "next/image";
import Button from "@material-ui/core/Button";
import SoulSynthNav from "@/components/SoulSynthNav";
import styles from "@/styles/register.module.css";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import spotifyLogo from "@/images/spotify.png";
import React from "react";
import Footer from "@/components/Footer";
//import useSWR from "swr";

// const fetcher = (url) =>
//   "https://api.spotify.com/v1/me".then((res) => res.data);

const RegisterSpotify = () => {
  // const stateKey = "spotify_auth_state";
  //
  // /**
  //  * Obtains parameters from the hash of the URL
  //  * @return Object
  //  */
  //
  // const getHashParams = () => {
  //   const hashParams = {};
  //   const r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   let e = "";
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   return hashParams;
  // };
  //
  // /**
  //  * Generates a random string containing numbers and letters
  //  * @param  {number} length The length of the string
  //  * @return {string} The generated string
  //  */
  // const generateRandomString = (length) => {
  //   let text = "";
  //   const possible =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //
  //   for (let i = 0; i < length; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // };
  //
  // // let userProfileSource = document.getElementById(
  // //     "user-profile-template"
  // //   ).innerHTML,
  // //   userProfileTemplate = Handlebars.compile(userProfileSource),
  // //   userProfilePlaceholder = document.getElementById("user-profile");
  // //
  // // (oauthSource = document.getElementById("oauth-template").innerHTML),
  // //   (oauthTemplate = Handlebars.compile(oauthSource)),
  // //   (oauthPlaceholder = document.getElementById("oauth"));
  //
  // let params = getHashParams();
  //
  // let access_token = params.access_token,
  //   state = params.state,
  //   storedState = localStorage.getItem(stateKey);
  //
  // if (access_token && (state == null || state !== storedState)) {
  //   alert("There was an error during the authentication");
  // } else {
  //   localStorage.removeItem(stateKey);
  //   if (access_token) {
  //       SWR
  //       url: "https://api.spotify.com/v1/me",
  //       headers: ()
  //         Authorization: "Bearer " + access_token,
  //       }
  //       // ,
  //       // success: function (response) {
  //       //   userProfilePlaceholder.innerHTML = userProfileTemplate(response);
  //       //
  //       //   $("#login").hide();
  //       //   $("#loggedin").show();
  //       // }
  //   } else {
  //     $("#login").show();
  //     $("#loggedin").hide();
  //   }
  //
  //   document.getElementById("login-button").addEventListener(
  //     "click",
  //     function () {
  //       let client_id = "22fdf98a46224160af0ee3b3cc7030b0"; // Your client id
  //       let redirect_uri = "soul-synth-app-login://callback"; // Your redirect uri
  //
  //       let state = generateRandomString(16);
  //
  //       localStorage.setItem(stateKey, state);
  //       let scope = "user-read-private user-read-email";
  //
  //       let url = "https://accounts.spotify.com/authorize";
  //       url += "?response_type=token";
  //       url += "&client_id=" + encodeURIComponent(client_id);
  //       url += "&scope=" + encodeURIComponent(scope);
  //       url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  //       url += "&state=" + encodeURIComponent(state);
  //
  //       window.location = url;
  //     },
  //     false
  //   );
  // }

  return (
    <div className={styles.RegisterPage}>
      <SoulSynthNav />
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
            <Button>
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
  );
};

export default RegisterSpotify;
