import useSWR from "swr";
import api from "@/api/api";
import styles from "@/styles/register.module.css";
import Loading from "@/components/Loading";
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button, TextField } from "@material-ui/core";
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

const PlaylistPage = () => {
  const { data, error } = useSWR("/playlists", fetcher);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [playlistID, setPlaylistId] = useState(0);
  const [errorsList, setErrorsList] = useState([]);
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

  const handleDeletePlaylist = async (id) => {
    const response = await Playlist.delete(id);
    console.log("response", response);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);

      const response = await Playlist.update(playlistID, formData);
      console.log("response", response);
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
      <h1>My Playlists</h1>
      <TableContainer className={styles.scrollv}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody styles={"max"}>
            {data.map((playlist) => (
              <TableRow key={playlist.id}>
                <Link href={`/playlists/${playlist.id}`}>
                  <TableCell align="right">{playlist.name}</TableCell>
                </Link>
                <div>
                  <Button className={styles.button}>
                    <ModeEditIcon onClick={() => handleOpen2(playlist.id)} />
                    <Modal
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="Update playlist"
                      aria-describedby="Update playlist"
                    >
                      <Box sx={{ ...style, width: 300 }}>
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
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                          >
                            Update
                          </Button>

                          <Button onClick={handleClose2}>Cancel</Button>
                        </form>
                      </Box>
                    </Modal>
                  </Button>
                  <Button className={styles.button}>
                    <DeleteOutlineIcon onClick={handleOpen} />
                  </Button>
                </div>
                <Modal
                  hideBackdrop
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 500 }}>
                    <h3>Are you sure yo want to delete the playlist?</h3>

                    <Button onClick={() => handleDeletePlaylist(playlist.id)}>
                      Yes
                    </Button>
                    <h6>Or</h6>
                    <Button onClick={handleClose}>Cancel</Button>
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

export default PlaylistPage;
