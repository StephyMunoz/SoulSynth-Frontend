import useSWR from "swr";
import api from "@/api/api";
import styles from "@/styles/register.module.css";
import Loading from "@/components/Loading";
import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button } from "@material-ui/core";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableContainer from "@material-ui/core/TableContainer";

const fetcher = (url) => api.get(url).then((res) => res.data);

const PlaylistPage = () => {
  const { data, error } = useSWR("/playlists", fetcher);
  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }
  return (
    <div className={styles.RegisterPage}>
      <h1>My Playlists</h1>
      {/*{if(data.lenght === 0){*/}
      {/*  */}
      {/*}}*/}
      <TableContainer className={styles.scrollv}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody styles={"max"}>
            {data.map((playlist) => (
              <TableRow key={playlist.id}>
                <TableCell align="right">{playlist.name}</TableCell>
                <div>
                  <Button className={styles.button}>
                    <ModeEditIcon />
                  </Button>
                  <Button className={styles.button}>
                    <DeleteOutlineIcon />
                  </Button>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlaylistPage;
