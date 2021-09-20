import styles from "@/styles/register.module.css";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";

const AccountPage = () => {
  const { user } = useAuth();
  return (
    <div className={styles.RegisterPage}>
      <h1>Hi {user.username}</h1>
      <h3>You`re register with your Spotify account: {user.email}</h3>
      <h6>
        If you want to see you playlists please click{" "}
        <Link href="/playlists">Here</Link>
      </h6>
    </div>
  );
};

export default AccountPage;
