import NextAuth from "next-auth";
import Providers from "next-auth/providers";
//import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      // eslint-disable-next-line
      clientId: process.env.SPOTIFY_CLIENT_ID,
      // eslint-disable-next-line
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      // eslint-disable-next-line
      redirect_URI: process.env.SPOTIFY_REDIRECT_URI,
      //
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          // image: profile.images?.[0]?.url,
        };
      },
    }),
  ],
});
