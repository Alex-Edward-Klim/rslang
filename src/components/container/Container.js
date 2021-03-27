import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";
import MainPage from "../mainPage/MainPage";
import GameMemory from "../GameMemory/GameMemory";
import Example from "../GameMemory/example";
import Audiocall from "../audiocall/Audiocall";
import Footer from "../footer/Footer";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Footer />} />
          <Route path="/login" exact render={() => <Footer />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/elTextBook" render={() => <ElTextBook />} />
          <Route path="/gamememory" exact render={() => <GameMemory />} />
          <Route path="/example" exact render={() => <Example />} />
          <Route path="/audiocall" exact render={() => <Audiocall />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;
