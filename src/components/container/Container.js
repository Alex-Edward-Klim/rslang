import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";
import MainPage from "../mainPage/MainPage";
import GameMemoryStart from "../GameMemory/GameMemoryStart/GameMemoryStart";
import GameMemory from "../GameMemory/GameMemory";
// import Example from "../GameMemory/example";
import Audiocall from "../audiocall/Audiocall";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/elTextBook" render={() => <ElTextBook />} />
          <Route path="/game_memory_start/:id" exact render={() => <GameMemoryStart />} />
          <Route path="/game_memory/:id" exact render={props => <GameMemory {...props} />} />
          {/* <Route path="/example/:id" exact render={props => <Example {...props} />} /> */}
          <Route path="/audiocall" exact render={() => <Audiocall />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;