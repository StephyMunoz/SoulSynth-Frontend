import api from "@/api/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import TableContainer from "@material-ui/core/TableContainer";
import styles from "@/styles/songs.module.css";
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
import Stack from "@mui/material/Stack";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import $ from "jquery";
import Paper from "@material-ui/core/Paper";
import { styled, useTheme } from "@mui/material/styles";
import styledC from "styled-components";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 800,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "1.5em",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const fetcher = (url) => api.get(url).then((res) => res.data);

const schema = yup.object().shape({
  name: yup.string().required(),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e5acac",
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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#4abcc1",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.7,
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
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [idSong, setIdSong] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = useState(32);
  const [paused, setPaused] = useState(false);
  const [player, setPlayer] = useState(false);
  const [songId, setsongId] = useState(undefined);

  console.log("data", songs);
  console.log("dataP", playlists);

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

      setResult("Playlist successfully added");
      reset();
      console.log("response", response);
      handleClose();
      if (result === "Playlist successfully added") {
        return (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          </Stack>
        );
      }
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("An error has occurred");

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
    console.log("result", result);
  };
  // if (playlists.length !== 0) {
  //   for (let i = 0; i < playlists.length; i++) {
  //     if (id == playlists[i].feeling) {
  //       setNum(num + 1);
  //     }
  //   }
  // }
  const handleOpen2 = (idSong) => {
    setIdSong(idSong);
    setOpen2(true);
    // if (num > 0) {
    //
    //   setOpen3(true);
    // }
  };

  console.log("result", result);

  // const handleAddSong = (id) => {
  //   if (playlists.length !== 0) {
  //     for (let i = 0; i < playlists.length; i++) {
  //       if (id === playlists[i].feeling) {
  //         setNum(+1);
  //       }
  //     }
  //   }
  // };
  console.log("id", id);
  console.log("idSong", idSong);
  const handleAdd = async (idPlay) => {
    console.log("idPlay", idPlay);
    const response = await Playlist.store(idPlay, idSong);
    console.log("response", response);
    handleClose2();
  };
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  // const mainIconColor = "light" === "dark" ? "#fff" : "#000";
  // console.log("theme", theme.palette.mode);

  return (
    <div className={styles.songs}>
      <StyledButton onClick={handleOpen} className={classes.modalButton}>
        Create a new playlist
        <AddCircleOutlineIcon />
      </StyledButton>
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

            <Button onClick={handleOpen}>Add a new playlist</Button>
            <Button onClick={handleClose2}>Cancel</Button>
          </StyledBox>
        </Modal>
      </div>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget sx={{ padding: "2em", margin: "1.5em auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5em",
            }}
          >
            <CoverImage sx={{ width: "15em", height: "15em" }}></CoverImage>
          </Box>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setPosition(value)}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgb(255 255 255 / 16%)"
                      : "rgb(0 0 0 / 16%)"
                  }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: -2,
            }}
          >
            <TinyText>{() => formatDuration(position)} </TinyText>
            <TinyText>-{() => formatDuration(duration - position)}</TinyText>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -1,
            }}
          >
            <IconButton aria-label="previous song">
              <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <PlayArrowRounded
                  fontSize="large"
                  sx={{
                    margin: "0 1em",
                  }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  fontSize="large"
                  sx={{
                    margin: "0 1em",
                  }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>
            <IconButton aria-label="next song">
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          </Box>
        </Widget>
      </Box>

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
