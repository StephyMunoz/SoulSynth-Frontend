import { useRouter } from "next/router";
import api from "@/api/api";
import Image from "next/image";
import useSWR from "swr";
import styles from "@/styles/songs.module.css";

const fetcher = (url) => api.get(url).then((res) => res.data);

const SongDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR("/songs/" + id, fetcher);

  if (error) {
    return "An error has occurred " + error;
  }

  if (!data) {
    return "Loading data...";
  }
  return (
    <div className={styles.songInfo}>
      <Image src={data.image} width={300} height={200} />
      <p>
        <strong>Title:</strong> {data.name}
      </p>
      <p>
        <strong>Artist:</strong> {data.artist}
      </p>
      <span>
        <p>
          <strong>Link to spotify:</strong> <a href={data.href}>{data.href}</a>
        </p>
        <p>
          <strong>Release date:</strong> {data.release_date}
        </p>
      </span>
      <span>
        <p>
          <strong>Album:</strong> {data.album}
        </p>
        <p>
          <strong>Genre:</strong> {data.genre}
        </p>
      </span>
      <button onClick={() => router.push("/songs")}>Return to playlist</button>
    </div>
  );
};

export default SongDetailPage;
