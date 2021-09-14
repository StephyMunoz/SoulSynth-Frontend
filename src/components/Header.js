import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import AuthMenu from "@/components/AuthMenu";
import styled from "styled-components";
import Image from "next/image";
import logo from "@/images/SoulSynthLogo.png";
import styles from "@/styles/register.module.css";

const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Image src={logo} width={150} height={70} />
        <AuthMenu />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

const StyledAppBar = styled(AppBar)`
  background-color: #000000;
`;
const StyledToolbar = styled(Toolbar)`
  background-color: #000000;
`;
