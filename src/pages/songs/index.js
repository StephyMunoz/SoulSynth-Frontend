import styles from '@/styles/songs.module.css';
import api from '@/apiAxios/api';
import Image from "next/image";
import Link from "next/link";


const SongsPage = ({songs}) => {

    return (
        <div className={styles.songs}>
            {songs.map((song) => (
                <div key={song.id} className={styles.song}>
                    <Link href={`/canciones/${song.id}`}><a>
                        <div>
                            {/*<Image src={song.image} width={400} height={300} />*/}
                            <Image
                                src={song.image}
                                width={300}
                                height={200}
                            />
                            <p>
                                <strong>Título: </strong>{song.name}
                            </p>
                            <p>
                                <strong>Artista: </strong>{song.artist}
                            </p>
                        </div></a>
                    </Link>

                </div>
            ))}
        </div>
    )
}
export default SongsPage;

export async function getStaticProps(context) {
    let songs = [];

    try {
        const response = await api.get('/songs');
        console.log('response', response);
        songs = response.data;
    } catch (e) {
    }
    return {
        props: {
            songs,
        }
    }
}


