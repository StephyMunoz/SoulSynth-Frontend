import styles from "@/styles/songs.module.css";
import api from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const SongsPage = ({ songs }) => {
  const classes = useStyles();

  return (
    <div className={styles.songs}>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
      {songs.map((song) => (
      <div key={song.id} className={styles.song}>
          <Link href={`/songs/${song.id}`}>
             <a>
              <div>
                <Image src={song.image} width={300} height={200} />
                <p>
                  <strong>Title: </strong>
                 
                  {song.name}
                </p>
                <p>
                  <strong>Artist: </strong>
                  {song.artist}

                </p>
                 <a>{ song.href}</a>
              </div>
            </a>
          </Link>
        </div>
      ))}
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
