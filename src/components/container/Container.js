import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";
import MainPage from "../mainPage/MainPage";
import GameMemoryStart from "../GameMemory/GameMemoryStart/GameMemoryStart";
import GameMemory from "../GameMemory/GameMemory";
// import Example from "../GameMemory/example";
import Audiocall from "../audiocall/Audiocall";
import Vocabulary from "../vocabulary/Vocabulary";
import Footer from "../footer/Footer";
import Settings from "../settings/Settings";
import Header from "../header/Header";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Header />  
        <div style={{ minHeight: "calc(100vh - 196px)", display: "flex", flexDirection: "column", alignItems:"center" }}>
          <Switch>
            <Route path="/" exact render={() => <MainPage />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/signup" exact render={() => <Signup />} />
            <Route path="/elTextBook" render={() => <ElTextBook />} />
            <Route path="/vocabulary" render={() => <Vocabulary />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route
              path="/game_memory_start/:id"
              exact
              render={() => <GameMemoryStart />}
            />
            <Route
              path="/game_memory/:id"
              exact
              render={(props) => <GameMemory {...props} />}
            />
            {/* <Route path="/example/:id" exact render={props => <Example {...props} />} /> */}
            <Route path="/audiocall" exact render={() => <Audiocall />} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Container;
