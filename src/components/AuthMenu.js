import React from "react";
import Link from "next/link";
import ProfileMenu from "@/components/ProfileMenu";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import styles from "@/styles/register.module.css";
import Button from "@material-ui/core/Button";
// import { Link as MuiLink } from "@material-ui/core";
// import Image from "next/image";
// import happy from "@/images/happy.png";
// import romantic from "@/images/romantic.png";

const AuthMenu = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Skeleton variant="rect" width={100} height={30} />;
  }

  if (!user) {
    return (
      <div>
        <Grid container>
          <Grid item className={styles.RegisterPageButton}>
            <Link href="/login">
              <Button>Log In!</Button>
            </Link>
          </Grid>
          <Grid item>
            <div className={styles.NavText}>
              <Link href="/">
                <Button>Go Home!</Button>
              </Link>
            </div>
          </Grid>
          <Grid item>
            <div className={styles.NavText}>
              <Link href="/signIn">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;
