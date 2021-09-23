import api from "@/api/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import TableContainer from "@material-ui/core/TableContainer";
import styles from "@/styles/songs.module.css";
import styles1 from "@/styles/register.module.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button, TextField } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Playlist from "@/api/playlist";
import Alert from "@mui/material/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
import Paper from "@material-ui/core/Paper";
import styledC from "styled-components";
import SpotifyPlayer from "react-spotify-player";
import Snackbar from "@material-ui/core/Snackbar";

const fetcher = (url) => api.get(url).then((res) => res.data);

const schema = yup.object().shape({
  name: yup.string().required(),
});

const size = {
  margin: "auto",
  width: "100%",
  height: 300,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(30, 232, 74, 0.76)",
  textAlign: "center",
  fontSize: "large",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: "#ffffff",
  opacity: 0.99,
};
const styleNew = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(39 232 240 / 63%)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
};
const useStyles = makeStyles(() => ({
  modalButton: {
    backgroundColor: "#2f79b9",
    color: "black",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
  },
  signupButton: {
    backgroundColor: "#4abcc1",
    color: "black",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
  },
  cancelButton: {
    backgroundColor: "#db0606",
    color: "black",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
  },
}));

const SongsWithFeelingPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { id } = router.query;
  const { data: songs, error } = useSWR("/songs/feelings/" + id, fetcher);
  const { data: playlists, errorPlay } = useSWR("/playlists", fetcher);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen2(false);
  const [errorsList, setErrorsList] = useState([]);
  const [idSong, setIdSong] = useState(0);
  const classes = useStyles();
  const [player, setPlayer] = useState(false);
  const [songId, setsongId] = useState(undefined);
  const [selectSong, setSelectSong] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorAction, setErrorAction] = useState(null);
  const [openAlert, setOpenAlert] = useState(true);

  if (error) {
    return "An error has ocurred" + error;
  }
  if (errorPlay) {
    return "An error has ocurred" + error;
  }

  if (!songs) {
    return <Loading />;
  }
  if (!playlists) {
    return <Loading />;
  }
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("feeling_id", id);

      const response = await Playlist.create(formData);

      reset();
      console.log("response", response);
      handleClose();
      if (response.status == 201) {
        setSuccess("Playlist successfully added");
        handleClose();
        handleOpenAlert();
      } else {
        setErrorAction("Something went wrong, please try again later");
        handleClose();
      }
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          // const errorList = Object.values(errors);
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }
  };

  const handleOpen2 = (idSong) => {
    setIdSong(idSong);
    setOpen2(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleAdd = async (idPlay) => {
    const response = await Playlist.store(idPlay, idSong);
    console.log("response", response);
    if (response.status == 200) {
      setSuccess("Song added successfully to your playlist");
      handleClose();
      handleOpenAlert();
    } else if (response.status == 208) {
      setErrorAction("This song is already in your playlist");
      handleClose();
      handleOpenAlert();
    } else {
      setErrorAction("Something went wrong, please try again later");
      handleClose();
    }
    handleClose2();
  };

  const handleSelectSong = (songItem) => {
    setSelectSong(songItem);
  };

  return (
    <div className={styles.songs}>
      {success && (
        <Grid container>
          <Grid item xs={12}>
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                {success}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      )}
      {errorAction && (
        <Grid container>
          <Grid item xs={12}>
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorAction}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <StyledButton onClick={handleOpen} className={classes.modalButton}>
            Create a new playlist
            <AddCircleOutlineIcon />
          </StyledButton>
        </Grid>
        <Grid item xs={12}>
          {selectSong && (
            <SpotifyPlayer
              uri={selectSong.link}
              size={size}
              autoplay={true}
              play={true}
            />
          )}
        </Grid>
      </Grid>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="Create a new playlist"
        aria-describedby="Create a new playlist"
      >
        <Box sx={{ ...styleNew, width: 300 }}>
          <h2 id="parent-modal-title">Add a new playlist</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Playlist Name"
                    variant="standard"
                    size="small"
                  />
                )}
              />
              <p>{errors.name?.message}</p>
            </div>
            {errorsList.length > 0 && (
              <ul>
                {errorsList.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Button type="submit" className={classes.modalButton}>
              ADD
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>
      <div>
        <Modal
          hideBackdrop
          open={open2}
          onClose={handleClose2}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          // className={classes.background}
        >
          <StyledBox sx={{ ...style, width: 500 }}>
            <h3>Where do you want to store your songs?</h3>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {playlists.map(
                    (playlist) =>
                      playlist.feeling == id && (
                        <TableRow
                          key={playlist.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {playlist.name}
                          </TableCell>
                          <TableCell align="right">
                            <AddCircleOutlineIcon
                              onClick={() => handleAdd(playlist.id)}
                            />
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={styles1.modalbutton}>
              <Button className={styles1.modalbutton1} onClick={handleOpen}>
                Add a new playlist
              </Button>
              <Button className={styles1.modalbutton2} onClick={handleClose2}>
                Cancel
              </Button>
            </div>
          </StyledBox>
        </Modal>
      </div>

      <TableContainer component={Paper} className={styles.scrollv}>
        <Table stickyHeader className={styles.table1}>
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Album</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody styles={"max"}>
            {songs.map((song) => (
              <TableRow key={song.name}>
                <TableCell align="right">
                  <Button
                    id={song.id}
                    onClick={() => {
                      //setsongId(song.id)
                      if (!player) {
                        $("#" + song.id + "play").attr(
                          "style",
                          "display:block !important"
                        );
                        $("#" + song.id + "pause").attr(
                          "style",
                          "display:none !important"
                        );
                        setPlayer(true);
                      }

                      if (player) {
                        $("#" + song.id + "pause").attr(
                          "style",
                          "display:block !important"
                        );
                        $("#" + song.id + "play").attr(
                          "style",
                          "display:none !important"
                        );
                        setPlayer(!player);
                        if (songId == null) {
                          setsongId(song.id);
                        } else if (song.id != songId) {
                          $("#" + songId + "play").attr(
                            "style",
                            "display:block !important"
                          );
                          $("#" + songId + "pause").attr(
                            "style",
                            "display:none !important"
                          );
                          setsongId(song.id);
                        }
                      }
                    }}
                    className={styles.button}
                  >
                    <PlayArrowIcon
                      id={song.id + "play"}
                      fontSize="large"
                      value="false"
                      className={styles.player2}
                      onClick={() => handleSelectSong(song)}
                    />

                    <PauseIcon
                      id={song.id + "pause"}
                      fontSize="large"
                      value="true"
                      className={styles.player1}
                    />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <h3>{song.name}</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>{song.artist}</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>{song.album}</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>{song.genre}</h3>
                </TableCell>
                <TableCell align="right">
                  <div>
                    <Button className={styles.button}>
                      <AddCircleOutlineIcon
                        onClick={() => handleOpen2(song.id)}
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.RegisterPage}>
        <Modal
          hideBackdrop
          open={open3}
          onClose={handleClose3}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h1>You don`t have a playlist with this feeling yet</h1>
            <Grid alignContent="center" xs={12}>
              <StyledButton
                onClick={handleOpen}
                className={classes.signupButton}
              >
                Add a playlist
              </StyledButton>
              <StyledButton
                onClick={handleClose3}
                className={classes.cancelButton}
              >
                Cancel
              </StyledButton>
            </Grid>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default withAuth(SongsWithFeelingPage);

const StyledButton = styledC(Button)`
  background-color: #46fc18;
  margin-bottom: 25px;
  align-items: flex-start;
`;
const StyledBox = styledC(Box)`
  background-color: "#655C8B" !important;
`;
