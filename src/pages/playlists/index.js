import useSWR from "swr";
import api from "@/api/api";
import styles from "@/styles/register.module.css";
import Loading from "@/components/Loading";
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button, TextField, Link as MuiLink } from "@material-ui/core";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableContainer from "@material-ui/core/TableContainer";
import Playlist from "@/api/playlist";
import Box from "@material-ui/core/Box";
import { Controller, useForm } from "react-hook-form";
import Modal from "@material-ui/core/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";

const fetcher = (url) => api.get(url).then((res) => res.data);

const schema = yup.object().shape({
  name: yup.string().required(),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "Times New Roman",
  fontSize: "large",
  width: 400,
  height: 250,
  textaline: "center",
  bgcolor: "rgba(30, 232, 74, 0.76)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PlaylistPage = () => {
  const { data, error } = useSWR("/playlists", fetcher);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [playlistID, setPlaylistId] = useState(0);
  const [errorsList, setErrorsList] = useState([]);
  const [openAlert, setOpenAlert] = useState(true);
  const [success, setSuccess] = useState(null);
  const [errorAction, setErrorAction] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (error) {
    return "Han error has ocurred" + error;
  }

  if (!data) {
    return <Loading />;
  }
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const handleDeletePlaylist = async (id) => {
    const response = await Playlist.delete(id);
    console.log("response", response);
    if (response.status == 204) {
      setSuccess("Playlist deleted successfully");
      handleClose();
      handleOpenAlert();
    } else {
      setErrorAction("Something went wrong, please try again later");
      handleClose();
    }
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);

      const response = await Playlist.update(playlistID, formData);
      console.log("response", response);
      if (response.status == 200) {
        setSuccess("Playlist updated");
        handleClose();
        handleOpenAlert();
      } else {
        setErrorAction("Something went wrong, please try again later");
        handleClose();
      }
      reset();
      handleClose2();
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
          setErrorsList(newErrorList);
        }
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen2 = (id) => {
    setOpen2(true);
    console.log("id", id);
    setPlaylistId(id);
  };

  return (
    <div className={styles.RegisterPage}>
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
      <h1>My Playlists</h1>
      <TableContainer className={styles.scrollv}>
        <Table>
          <TableBody styles={"max"}>
            {data.map((playlist) => (
              <TableRow key={playlist.id}>
                <TableCell align="right" className={styles.namecel}>
                  <Link href={`/playlists/${playlist.id}`}>
                    <MuiLink underline="hover">
                      <h2>{playlist.name}</h2>
                    </MuiLink>
                  </Link>
                </TableCell>

                <TableCell>
                  <Button className={styles.button}>
                    <ModeEditIcon
                      fontSize="large"
                      onClick={() => handleOpen2(playlist.id)}
                    />
                    <Modal
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="Update playlist"
                      aria-describedby="Update playlist"
                    >
                      <Box
                        sx={{ ...style, textAlign: "center", color: "#fff" }}
                      >
                        <h2 id="parent-modal-title">Update playlist</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            <Controller
                              name="name"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Standard"
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
                          <div className={styles.modalbutton}>
                            <Button
                              type="submit"
                              color="success"
                              variant="contained"
                              size="large"
                            >
                              Update
                            </Button>

                            <Button
                              color="error"
                              size="large"
                              onClick={handleClose2}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </Box>
                    </Modal>
                  </Button>
                  <Button className={styles.button}>
                    <DeleteOutlineIcon fontSize="large" onClick={handleOpen} />

                    <Modal
                      hideBackdrop
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box
                        sx={{ ...style, textAlign: "center", color: "#fff" }}
                      >
                        <h2>Are you sure yo want to delete the playlist?</h2>
                        <div className={styles.modalbutton}>
                          <Button
                            color="success"
                            size="large"
                            onClick={() => handleDeletePlaylist(playlist.id)}
                          >
                            Yes
                          </Button>
                          <Button
                            color="error"
                            size="large"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlaylistPage;

// const Title = styled.h1`
//   font-family: "Goudy Stout";
//   font-weight: lighter;
// `;
