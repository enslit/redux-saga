import {AppBar, Button, Toolbar} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {FC} from "react";

const Header: FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button component={RouterLink} to={'/counter'} color="inherit">Counter</Button>
        <Button component={RouterLink} to={'/users'} color="inherit">Users</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;