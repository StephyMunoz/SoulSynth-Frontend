import styles from "@/styles/register.module.css";
import styled from "styled-components";
import { Button, Grid, Link as MuiLink } from "@material-ui/core";
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
    <div className={styles.RegisterPage}>
      <Title>How are you feeling today?</Title>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(1)}>
            <HappyContainer>
              Happy
              <Image src={happy} width={75} />
            </HappyContainer>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(2)}>
            <RomanticContainer>
              Romantic
              <Image src={romantic} width={75} />
            </RomanticContainer>
          </MuiLink>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(3)}>
            <SadContainer>
              Sad
              <Image src={sad} width={75} />
            </SadContainer>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(4)}>
            <AngryContainer>
              Angry
              <Image src={angry} width={75} />
            </AngryContainer>
          </MuiLink>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(5)}>
            <PanickedContainer>
              Panicked
              <Image src={panicked} width={75} />
            </PanickedContainer>
          </MuiLink>
        </Grid>
        <Grid item xs={6}>
          <MuiLink onClick={() => getPlaylists(6)}>
            <CuriousContainer>
              Curious
              <Image src={curious} width={75} />
            </CuriousContainer>
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

const Title = styled.h1`
    color: #ffffff,
    font-size: 30px,
    text-align: center,
`;
const HappyContainer = styled.div`
  background-color: #e3da04;
`;
const SadContainer = styled.div`
  background-color: #070636;
`;
const RomanticContainer = styled.div`
  background-color: #bd4772;
`;
const AngryContainer = styled.div`
  background-color: #db0606;
`;
const PanickedContainer = styled.div`
  background-color: #49bf55;
`;
const CuriousContainer = styled.div`
  background-color: #ffffff;
`;
