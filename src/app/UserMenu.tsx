import { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Box } from "@material-ui/core";
import { sigOuttEndPoint } from "./backend";

import { makeStyles } from "@material-ui/core/styles";
import { userContext } from "./authContext";

const useStyles = makeStyles({
  useDatails: {
    borderBottom: "1px solid rgb(224,224,224)",
    display: "flex",
    marginBottom: "8px",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

interface iUserMenu {
  onSigOut: () => void;
}

export default function UserMenu(props: iUserMenu) {
  const user = useContext(userContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function singOut() {
    sigOuttEndPoint();
    props.onSigOut();
  }
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} keepMounted onClose={handleClose}>
        <Box className={classes.useDatails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={singOut}>Sair</MenuItem>
      </Menu>
    </>
  );
}
