import api from "@/api/api";
import useSWR from "swr";
import withAuth from "@/hocs/withAuth";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import TableContainer from "@material-ui/core/TableContainer";
import styles from "@/styles/songs.module.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Playlist from "@/api/playlist";
import Box from "@mui/material/Box";
import $ from "jquery";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import styledC from "styled-components";
import Grid from "@material-ui/core/Grid";
import SpotifyPlayer from "react-spotify-player";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@material-ui/core/Snackbar";

const size = {
  width: "100%",
  height: 300,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#00ffb380",
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: "center",
  color: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
};
const useStyles = makeStyles(() => ({
  sectionTitle: {
    backgroundColor: "#c4c4c4",
    textAlign: "center",
    color: "#2A2A2A",
    padding: "5px",
  },
  deleteButton: {
    backgroundColor: "#DF1B3E",
    color: "#ffffff",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
    borderColor: "#000000",
  },
  cancelButton: {
    backgroundColor: "#666d89",
    color: "#ffffff",
    padding: "10px 50px",
    borderRadius: "25px",
    textAlign: "center",
    fontSize: "1em",
    borderColor: "#000000",
  },
}));

const fetcher = (url) => api.get(url).then((res) => res.data);

const PlaylistUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();
  const { data, error } = useSWR(`/playlists/${id}/songs`, fetcher);
  const [player, setPlayer] = useState(false);
  const [songId, setsongId] = useState(undefined);
  const [songIdDelete, setSongIdDelete] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [songSelect, setSongSelect] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorAction, setErrorAction] = useState(null);
  const handleClose = () => setOpen(false);

  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }

  const handleDeleteSong = async () => {
    const response = await Playlist.deleteSong(id, songIdDelete);

    if (response.status == 204) {
      setSuccess("Song deleted successfully from your playlist");
      handleClose();
      handleOpenAlert();
    } else {
      setErrorAction("Something went wrong, please try again later");
      handleClose();
    }
  };
  const handleOpen = (idS) => {
    setOpen(true);
    setSongIdDelete(idS);
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handlePlay = (songItem) => {
    setSongSelect(songItem);
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
      {songSelect && (
        <Grid container>
          <Grid item xs={12}>
            <SpotifyPlayer uri={songSelect.link} size={size} />
          </Grid>
        </Grid>
      )}
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
            {data.map((song) => (
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
                      onClick={() => handlePlay(song)}
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
                  <Button className={styles.button}>
                    <DeleteOutlineIcon onClick={() => handleOpen(song.id)} />
                  </Button>
                </TableCell>

                <Modal
                  hideBackdrop
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 500 }}>
                    <Title>Are you sure yo want to delete </Title>
                    <Title> the song from your playlist?</Title>
                    <StyledButton
                      onClick={handleDeleteSong}
                      className={classes.deleteButton}
                    >
                      Delete
                    </StyledButton>
                    {"  "}
                    <StyledButton
                      onClick={handleClose}
                      className={classes.cancelButton}
                    >
                      Cancel
                    </StyledButton>
                  </Box>
                </Modal>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withAuth(PlaylistUserPage);

const Title = styledC.p`
  font-family: "Bahnschrift SemiLight";
  font-weight: lighter;
  font-size: 25px;
`;
const StyledButton = styledC(Button)`
  font-family: "Bahnschrift SemiLight";
  font-weight: lighter;
  font-size: 20px;
`;
