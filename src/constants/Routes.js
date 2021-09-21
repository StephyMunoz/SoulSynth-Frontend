const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  SignIn: "/signIn",
};
const privateRoutes = {
  HOME: "/",
  Feelings: "/songs/feelings",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
