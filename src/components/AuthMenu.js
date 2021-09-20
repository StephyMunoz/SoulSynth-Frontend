import React from "react";
import Link from "next/link";
import ProfileMenu from "@/components/ProfileMenu";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import styles from "@/styles/register.module.css";
import Button from "@material-ui/core/Button";

const AuthMenu = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Skeleton variant="rect" width={100} height={30} />;
  }

  if (!user) {
    return (
      <div>
        {/*<Link href="/login">*/}
        {/*  <MuiLink component="button" color="inherit">*/}
        {/*    Login*/}
        {/*  </MuiLink>*/}
        {/*</Link>*/}
        <Grid item direction="row">
          <Grid item direction="row" className={styles.RegisterPageButton}>
            <Link href="/login">
              <Button>Log In!</Button>
            </Link>
          </Grid>
          <Grid item direction="row">
            <div className={styles.NavText}>
              <Button>Go back!</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;
