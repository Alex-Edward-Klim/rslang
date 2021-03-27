import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";
import ElTextBook from "../elTextBook/ElTextBook";

import MainPage from "../mainPage/MainPage";
import GameMemory from "../GameMemory/GameMemory";
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
          <Route path="/gamememory" exact render={() => <GameMemory />} />
          <Route path="/audiocall" exact render={() => <Audiocall />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;

const testAr = [1, 3, 5, 2, 6, 8, 7, 11, 36, 42, 37]

function test(ar) {

  const sortAr = ar.sort((a, b) => a - b)

  let st = sortAr[0]
  const temp = []
  
  for (let i = 0; i < sortAr.length; i++) {
    if (sortAr[i + 1] !== sortAr[i] + 1) {
      if (st === sortAr[i]) {
        temp.push(`${st}`)
        st = sortAr[i + 1]
        continue
      }
      temp.push(`${st} - ${sortAr[i]}`)
      st = sortAr[i + 1]
    }
  }
  return temp.join(', ')
}

console.log(test(testAr))
