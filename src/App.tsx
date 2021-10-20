import React from 'react';
import { Counter } from './features/counter/Counter';
import {Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Users from "./features/users/Users";
import {Box} from "@mui/material";

function App() {
  return (
    <div className="App">
      <Header />
      <Box sx={{ pt: 10, px: 2 }}>
        <Switch>
          <Route path={'/counter'} component={Counter} />
          <Route path={'/users'} component={Users} />
          <Redirect to={'/counter'} />
        </Switch>
      </Box>
    </div>
  );
}

export default App;
