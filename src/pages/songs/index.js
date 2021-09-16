import styles from "@/styles/songs.module.css";
import api from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import PauseIcon from '@material-ui/icons/Pause';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';




const SongsPage = ({ songs }) => {

  return (
    <div className={styles.songs}>
      <TableContainer component={Paper} className={styles.scrollv}>
      <Table  stickyHeader aria-label="sticky table">
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
                <Button>

              <PlayArrowIcon fontSize="large" className={styles.player} />
              <PauseIcon fontSize="large" className={styles.player} />
                <Image src={song.image} width={70} height={60} className={styles.image}/>
                </Button>
                </TableCell>
              <TableCell align="right">{song.name}</TableCell>
              <TableCell align="right">{song.artist}</TableCell>
              <TableCell align="right">{song.album}</TableCell>
              <TableCell align="right">{song.genre}</TableCell>
              <TableCell align="right">
                <div >

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

export default SongsPage;

SongsPage.propTypes = {
  songs: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  let songs = [];

  try {
    const response = await api.get("/songs");
    console.log("response", response);
    songs = response.data;
  } catch (e) {
    console.log("e", e);
  }
  return {
    props: {
      songs,
    },
  
  };
}
