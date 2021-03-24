import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Signup from "../signup/Signup";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <h1>Main Page</h1>} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;
