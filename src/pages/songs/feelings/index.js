import styles from "@/styles/register.module.css";
import styled from "styled-components";
import { Grid, Link as MuiLink } from "@material-ui/core";
import Link from "next/link";
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

const fetcher = (url) => api.get(url).then((res) => res.data);

const FeelingsChoicePage = () => {
  const [open, setOpen] = useState(false);
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
    console.log("id", id);
    console.log("data", data);
    if (data.length === 0) {
      router.push(`/songs/feelings/${id}`);
    } else {
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].feeling) {
          console.log("data[i]", data[i].feeling);
          setOpen(true);
          console.log("open", open);
          return (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            />
          );
        }
        // else {
        //   router.push(`/songs/feelings/${id}`);
        // }
      }
    }
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
          <Link href="/songs/feelings/4">
            <AngryContainer>
              Angry
              <Image src={angry} width={75} />
            </AngryContainer>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Link href="/songs/feelings/5">
            <PanickedContainer>
              Panicked
              <Image src={panicked} width={75} />
            </PanickedContainer>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="/songs/feelings/6">
            <CuriousContainer>
              Curious
              <Image src={curious} width={75} />
            </CuriousContainer>
          </Link>
        </Grid>
      </Grid>
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
