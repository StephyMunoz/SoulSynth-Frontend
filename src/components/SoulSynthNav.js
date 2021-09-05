import React from "react";
import Image from "next/image";
import logo from "@/images/ghostSoul.png";
import styles from "../styles/register.module.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const SoulSynthNav = () => {
  return (
    <div className={styles.SoulSynthNav}>
      <Grid
        className={styles.SoulSynthNav}
        spacing={12}
        container
        direction="row"
        justifyContent="flex-start"
      >
        <Grid item xs={4} direction="column">
          <Image
            className={styles.logo}
            height={80}
            width={80}
            src={logo}
            alt="No image found"
          />
        </Grid>
        <Grid item direction="column">
          <Grid item direction="row">
            <Grid item direction="column" className={styles.RegisterPageButton}>
              <Button>I already have an account here!</Button>
            </Grid>
            <Grid item direction="column">
              <div className={styles.NavText}>
                <Button>Go back!</Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default SoulSynthNav;
