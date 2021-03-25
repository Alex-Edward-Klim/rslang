import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";
import GameMemory from "../GameMemory/example"
import MainPage from "../mainPage/MainPage";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/elTextBook" render={() => <ElTextBook />} />
          <Route path="/gamememory" exact render={() => <GameMemory />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;
