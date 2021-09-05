import React from "react";
import { useAuth } from "@/contexts/auth";
import { Button } from "@material-ui/core";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      {" "}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
