import useSWR from "swr";
import api from "@/api/api";
import styles from "@/styles/register.module.css";
import Loading from "@/components/Loading";
import { Button, Link as MuiLink } from "@material-ui/core";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
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

const UsersPlaylist = () => {
  const { data, error } = useSWR("/playlists", fetcher);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }

  const handleOpen = () => {
    if (data.length !== 0) {
      setOpen(true);
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h3>Do you want to listen any of your playlists?</h3>

          {data.map((playlist) => (
            <div key={playlist.id}>
              <Link href={`/playlists/${playlist.id}`} passHref>
                <MuiLink>{playlist.name}</MuiLink>
              </Link>
            </div>
          ))}
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPlaylist;
