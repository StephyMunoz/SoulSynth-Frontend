import styles from "@/styles/register.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Grid, Link as MuiLink } from "@material-ui/core";
import Image from "next/image";
import happy from "@/images/happy.png";
import sad from "@/images/sad.png";
import curious from "@/images/curious.png";
import romantic from "@/images/romantic.png";
import panicked from "@/images/panicked.png";
import angry from "@/images/angry.png";
import api from "@/api/api";
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Link from "next/link";

const fetcher = (url) => api.get(url).then((res) => res.data);

const useStyles = makeStyles(() => ({
  mainDiv: {
    backgroundColor: "#2A2A2A",
    display: "block",
    justifyContent: "center",
    paddingTop: "50px"
  },
  Title: {
    color: "#ffffff",
    textAlign: "center",
    paddingBottom: "100px",
    fontWeight: "bold"
  },
  feelingGrid: {
    margin: "0 auto",
    width: "1200px",
    paddingBottom: "20px"
  },
  HappyContainer: {
    backgroundColor: "#e3da04",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "#ffffff",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  RomanticContainer: {
    backgroundColor: "#bd4772",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "#ffffff",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  SadContainer: {
    backgroundColor: "#070636",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "#ffffff",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  PanickedContainer: {
    backgroundColor: "#49bf55",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "#ffffff",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  AngryContainer: {
    backgroundColor: "#db0606",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "#ffffff",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  CuriousContainer: {
    backgroundColor: "#ffffff",
    width: "500px",
    height: "100px",
    borderRadius: "20px",
    color: "black",
    justifyContent: "space-between",
    paddingLeft: "30px"
  },
  feeling: {
    fontWeight: "bold",
    paddingTop: "20px"
  }

}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const FeelingsChoicePage = () => {
  const [open, setOpen] = useState(false);
  const [feeling, setFeeling] = useState(0);
  const router = useRouter();
  const { data, error } = useSWR("/playlists", fetcher);
  const classes = useStyles();
  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }

  const handleClose = () => setOpen(false);

  const getPlaylists = (id) => {
    console.log("data", data);
    setFeeling(id);
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].feeling) {
          setOpen(true);
        } else {
          setOpen(true);
        }
      }
    } else {
      router.push(`/songs/feelings/${id}`);
    }
  };
  const handleRedirect = () => {
    router.push(`/songs/feelings/${feeling}`);
    console.log("id", feeling);
  };

  return (
    <div className={classes.mainDiv}>
      <Typography variant="h3" className={classes.Title}>
        How are you feeling today?
      </Typography>
      <Grid container spacing={8} className={classes.feelingGrid}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(1)}>
            <Grid container className={classes.HappyContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Happy
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={happy} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(2)}>
            <Grid container className={classes.RomanticContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Romantic
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={romantic} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
      </Grid>

      <Grid container spacing={8} className={classes.feelingGrid}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(3)}>
            <Grid container className={classes.SadContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Sad
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={sad} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(4)}>
            <Grid container className={classes.AngryContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Angry
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={angry} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
      </Grid>

      <Grid container spacing={8} className={classes.feelingGrid}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(5)}>
            <Grid container className={classes.PanickedContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Panicked
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={panicked} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(6)}>
            <Grid container className={classes.CuriousContainer}>
              <Grid item direction={"column"}>
                <Typography variant="h3" className={classes.feeling}>
                  Curious
                </Typography>
              </Grid>
              <Grid item direction={"column"}>
                <Image src={curious} width={100} height={100} />
              </Grid>
            </Grid>
          </MuiLink>
        </Grid>
      </Grid>
      <div className={styles.RegisterPage}>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h1>What do you prefer?</h1>
            <h4>Listen your playlist</h4>
            {data.map(
              (playlist) =>
                playlist.feeling === feeling && (
                  <div key={playlist.id}>
                    <Link href={`/playlists/${playlist.id}`} passHref>
                      <MuiLink>{playlist.name}</MuiLink>
                    </Link>
                  </div>
                )
            )}
            <Button onClick={handleRedirect}>Discover new music</Button>
            Or
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default withAuth(FeelingsChoicePage);

