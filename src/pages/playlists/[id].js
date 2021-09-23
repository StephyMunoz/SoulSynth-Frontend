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
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import $ from "jquery";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#00ffb380",
  // border: "2px solid #000",
  // boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign:'center',
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
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = useState(32);
  const [paused, setPaused] = useState(false);
  const { data, error } = useSWR(`/playlists/${id}/songs`, fetcher);
  const [player, setPlayer] = useState(false);
  const [songId, setsongId] = useState(undefined);
  const [songIdDelete, setSongIdDelete] = useState(undefined);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }

  const handleDeleteSong = async () => {
    const response = await Playlist.deleteSong(id, songIdDelete);
    console.log("response", response);
    handleClose();
  };
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const handleOpen = (idS) => {
    setOpen(true);
    setSongIdDelete(idS);
  };

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  return (
    <div className={styles.songs}>
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
