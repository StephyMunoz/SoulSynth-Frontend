import api from "@/api/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import styles from "@/styles/songs.module.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button, TextField } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Image from "next/image";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import stylesBackground from "@/styles/register.module.css";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Playlist from "@/api/playlist";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
  // const { dataPlaylist, errorPlaylist } = useSWR("/playlists", fetcher);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleOpen3 = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen2(false);
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [idSong, setIdSong] = useState(0);
  const [num, setNum] = useState(0);

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
  console.log("num", num);

  return (
    <div>
      <Button onClick={handleOpen}>Create a new playlists</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="Create a new playlist"
        aria-describedby="Create a new playlist"
      >
        <Box sx={{ ...style, width: 300 }}>
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
                    variant="outlined"
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

            <Button type="submit" color="primary" variant="contained">
              ADD
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>

      <div className={styles.RegisterPage}>
        <Modal
          hideBackdrop
          open={open2}
          onClose={handleClose2}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h3>Where do you want to store your songs?</h3>
            <div>
              {playlists.map(
                (playlist) =>
                  playlist.feeling == id && (
                    <div key={playlist.id}>
                      <div>
                        {playlist.name}{" "}
                        <AddCircleOutlineIcon
                          onClick={() => handleAdd(playlist.id)}
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
            <Button onClick={handleOpen}>Add a new playlist</Button>
            <Button onClick={handleClose2}>Cancel</Button>
          </Box>
        </Modal>
      </div>

      <TableContainer
        component={Paper}
        className={stylesBackground.RegisterPage}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Album</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody styles={"max"}>
            {songs.map((song) => (
              <TableRow key={song.id}>
                <TableCell align="right">
                  <Button>
                    <PlayArrowIcon fontSize="large" className={styles.player} />
                    <PauseIcon fontSize="large" className={styles.player} />
                    <Image
                      src={song.image}
                      width={70}
                      height={60}
                      className={styles.image}
                    />
                  </Button>
                </TableCell>
                <TableCell align="right">{song.name}</TableCell>
                <TableCell align="right">{song.artist}</TableCell>
                <TableCell align="right">{song.album}</TableCell>
                <TableCell align="right">{song.genre}</TableCell>
                <TableCell align="right">
                  <div>
                    <Button className={styles.button}>
                      <AddCircleOutlineIcon
                        onClick={() => handleOpen2(song.id)}
                        // onClick={() => handleAddSong(song.id)}
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
            <Button onClick={handleOpen}>Add a playlist</Button>
            <Button onClick={handleClose3}>Cancel</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default withAuth(SongsWithFeelingPage);
