import styles from "@/styles/register.module.css";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";
import { styled } from '@mui/material/styles';


const AccountPage = () => {
  const { user } = useAuth();

  const Title = styled('h1')({

    color: 'blue',
    fontSize: 'xxx-large'


  });

  
  return (
    <div className={styles.RegisterPage}>
      <Title>Hi {user.username}</Title>
      <h3>You`re register with your Spotify account: <h2>{user.email}</h2></h3>
      <h4>
        If you want to see you playlists please click{" "}
        <Link href="/playlists">Here</Link>
      </h4>
    </div>
  );
};

export default withAuth(AccountPage);
