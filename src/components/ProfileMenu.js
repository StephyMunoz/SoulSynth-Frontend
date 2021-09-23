import React from "react";
import {
  Divider,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Grid,
  Typography
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Logout from "@/components/Logout";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/router";
import withAuth from "@/hocs/withAuth";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  feelingsLink: {
    backgroundColor: "#40F113",
    color: "black",
    padding: "5px",
    borderRadius: "20px",
    marginRight: "10px"
  },
  playlistsLink: {
    backgroundColor: "white",
    color: "black",
    padding: "5px",
    borderRadius: "20px",
    marginRight: "10px"
  },
  homeLink: {
    backgroundColor: "#2A2A2A",
    color: "white",
    padding: "5px",
    borderRadius: "20px"
  },
  vDivider: {
    backgroundColor: "white"
  },
  message: {
    color: "white",
    marginRight: "10px",
    paddingTop: "5px"
  },
  userIcon: {
    padding: "0px"
  }
}));

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const router = useRouter();
  const classes = useStyles();

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
      <Grid container className={classes.mainContainer}>
        <Link href="/songs/feelings" passHref>
          <MuiLink>
            <Grid item direction={"column"} className={classes.feelingsLink}> 
              <Typography variant="subtitle2">
                  How are you feeling today?
              </Typography>
            </Grid>
          </MuiLink>
        </Link>
        <Link href="/playlists" passHref>
          <MuiLink>
            <Grid item direction={"column"} className={classes.playlistsLink}> 
              <Typography variant="subtitle2">
                  My playlists
              </Typography>
            </Grid>
          </MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink>
            <Grid item direction={"column"} className={classes.homeLink}> 
              <Typography variant="subtitle2">
                  Home
              </Typography>
            </Grid>
          </MuiLink>
        </Link>
        <Divider orientation="vertical" variant="middle" className={classes.vDivider} flexItem />
        <Grid item direction={"column"} className={classes.message}> 
          <Typography variant="subtitle2">
            Welcome,
          </Typography>
        </Grid>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          className={classes.userIcon}
        >
          <AccountCircle /> {user.username}
        </IconButton>  
      </Grid>
      
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
