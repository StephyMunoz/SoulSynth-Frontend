const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
};
const privateRoutes = {
  HOME: "/",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
