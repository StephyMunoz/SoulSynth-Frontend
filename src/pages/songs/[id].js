import {useRouter} from "next/router";
import api from "@/apiAxios/api";
import Image from "next/image";
import useSWR from "swr";
import styles from '@/styles/songs.module.css';

const fetcher = (url) =>
    api
        .get(url, {
            headers: {
                Authorization:
                    "Bearer ",
            },
        })
        .then((res) => res.data);

const SongDetailPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const {data, error} = useSWR("/songs/" + id, fetcher);

    if (error) {
        return "Ocurrió un error " + error;
    }

    if (!data) {
        return "Cargando datos...";
    }
    return (
        <div className={styles.songInfo}>
            <Image src={data.image} width={300} height={200}/>
            <p><strong>Título:</strong> {data.name}</p>
            <p><strong>Artista:</strong> {data.artist}</p>
            <span>
                <p><strong>Link a spotify:</strong> <a href={data.href}>{data.href}</a></p>
                <p><strong>Fecha lanzamiento:</strong> {data.release_date}</p>
            </span>
            <span>
                <p><strong>Álbum:</strong> {data.album}</p>
                <p><strong>Género:</strong> {data.genre}</p>
            </span>
            <button onClick={() => router.push("/canciones")}>
                Regresar a la lista de reproducción
            </button>
        </div>
    );
};

export default SongDetailPage;