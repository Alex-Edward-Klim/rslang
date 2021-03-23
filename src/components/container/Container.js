import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../login/Login";

const Container = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <h1>Main Page</h1>} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <h1>Sign Up Page</h1>} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Container;
