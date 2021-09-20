import api from "@/api/api";
import useSWR from "swr";
import withAuth from "@/hocs/withAuth";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import TableContainer from "@material-ui/core/TableContainer";
import styles from "@/styles/songs.module.css";
import stylesBackground from "@/styles/register.module.css";
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

const fetcher = (url) => api.get(url).then((res) => res.data);

const PlaylistUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/playlists/${id}/songs`, fetcher);

  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }
  console.log("data", data);

  const handleDeleteSong = async (idSong) => {
    console.log("id", id);
    console.log("idSong", idSong);
    const response = await Playlist.deleteSong(id, idSong);
    console.log("response", response);
  };

  return (
    <div>
      <TableContainer className={stylesBackground.RegisterPage}>
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
            {data.map((song) => (
              <TableRow key={song.id}>
                <TableCell align="right">
                  <Button>
                    <PlayArrowIcon fontSize="large" className={styles.player} />
                    <PauseIcon fontSize="large" className={styles.player} />
                  </Button>
                </TableCell>
                <TableCell align="right">{song.name}</TableCell>
                <TableCell align="right">{song.artist}</TableCell>
                <TableCell align="right">{song.album}</TableCell>
                <TableCell align="right">{song.genre}</TableCell>
                <TableCell align="right">
                  <div>
                    <Button className={styles.button}>
                      <DeleteOutlineIcon
                        onClick={() => handleDeleteSong(song.id)}
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withAuth(PlaylistUserPage);
