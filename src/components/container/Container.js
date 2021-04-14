import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";
import MainPage from "../mainPage/MainPage";
import StartGame from "../StartGame/StartrGame";
import GetDataForGame from "../StartGame/GetDataForGame";
import GameMemory from "../GameMemory/GameMemory";
import GameSavanna from "../GameSavanna/GameSavanna";
import Audiocall from "../audiocall/Audiocall";
import Vocabulary from "../vocabulary/Vocabulary";
import Footer from "../footer/Footer";
import Settings from "../settings/Settings";
import Header from "../header/Header";
import Sprint from "../sprint/Sprint";
import Statistic from "../statistic/Statistic";

const Container = () => {
  let location = useLocation();
  const locationSlice = location.pathname.slice(0, 7);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "calc(100vh - 196px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding:
            "0 calc(20px - (100vw - 100%)) 0 calc(20px - (100vw - 100%))",
        }}
      >
        <Switch>
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/elTextBook" render={() => <ElTextBook />} />
          <Route path="/vocabulary" render={() => <Vocabulary />} />
          <Route path="/settings" render={() => <Settings />} />
          <Route path="/statistic" render={() => <Statistic />} />
          <Route
            path="/startgame/:game/:launchmodule"
            render={() => <StartGame />}
          />
          <Route
            path="/getdataforgame/:game/:launchmodule"
            render={(props) => <GetDataForGame {...props} />}
          />
          <Route
            path="/memory/:launchmodule"
            exact
            render={(props) => <GameMemory {...props} />}
          />
          <Route
            path="/savanna/:launchmodule"
            exact
            render={(props) => <GameSavanna {...props} />}
          />
          <Route
            path="/sprint/:launchmodule"
            exact
            render={(props) => <Sprint {...props} />}
          />
          <Route
            path="/audiocall/:launchmodule"
            exact
            render={(props) => <Audiocall {...props} />}
          />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
      {locationSlice !== "/memory" &&
        locationSlice !== "/savann" &&
        locationSlice !== "/sprint" &&
        locationSlice !== "/audioc" && <Footer />}
    </>
  );
};

export default Container;
