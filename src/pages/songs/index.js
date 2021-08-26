import styles from "@/styles/songs.module.css";
import api from "@/apiAxios/api";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const SongsPage = ({ songs }) => {
  return (
    <div className={styles.songs}>
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
