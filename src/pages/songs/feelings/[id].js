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
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Image from "next/image";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";

const fetcher = (url) => api.get(url).then((res) => res.data);

const SongsWithFeelingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR("/songs/feelings/" + id, fetcher);

  if (error) {
    return "Ocurrió un error" + error;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <TableContainer component={Paper} className={styles.scrollv}>
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
                      <AddCircleOutlineIcon />
                    </Button>
                    <Button className={styles.button}>
                      <DeleteOutlineIcon />
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

export default withAuth(SongsWithFeelingPage);
