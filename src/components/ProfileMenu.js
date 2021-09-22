import React from "react";
import {
  Divider,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Logout from "@/components/Logout";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/router";
import withAuth from "@/hocs/withAuth";
import Link from "next/link";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    router.push("/playlists");
  };
  const handleAccount = () => {
    router.push("/users");
  };

  return (
    <div>
      {/*<div>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*      alignItems: "center",*/}
      {/*      width: "fit-content",*/}
      {/*      border: (theme) => `1px solid ${theme.palette.divider}`,*/}
      {/*      borderRadius: 1,*/}
      {/*      bgcolor: "background.paper",*/}
      {/*      color: "text.secondary",*/}
      {/*      "& svg": {*/}
      {/*        m: 1.5,*/}
      {/*      },*/}
      {/*      "& hr": {*/}
      {/*        mx: 0.5,*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Link href="/" passHref>*/}
      {/*      <MuiLink>Home</MuiLink>*/}
      {/*    </Link>*/}
      {/*    <Divider orientation="vertical" flexItem />*/}
      {/*    <Link href="/songs/feelings" passHref>*/}
      {/*      <MuiLink>How are you feeling today?</MuiLink>*/}
      {/*    </Link>*/}
      {/*    <Divider orientation="vertical" flexItem />*/}
      {/*    <Link href="/playlists" passHref>*/}
      {/*      <MuiLink>My playlists</MuiLink>*/}
      {/*    </Link>*/}
      {/*  </Box>*/}
      {/*</div>*/}
      <Link href="/" passHref>
        <MuiLink>Home</MuiLink>
      </Link>
      <Divider orientation="vertical" textAlign="center" flexItem />
      <Link href="/songs/feelings" passHref>
        <MuiLink>How are you feeling today?</MuiLink>
      </Link>
      <Divider orientation="vertical" textAlign="center" flexItem />
      <Link href="/playlists" passHref>
        <MuiLink>My playlists</MuiLink>
      </Link>

      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle /> {user.username}
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withAuth(ProfileMenu);
