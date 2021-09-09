const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  SignIn: "/signIn",
};
const privateRoutes = {
  HOME: "/",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
