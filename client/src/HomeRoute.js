import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home.js";
import NotFound from "./containers/NotFound.js";
import Login from "./Login.js";
import AppliedRoute from "./AppliedRoute";
import Register from "./Register.js";



// export default () =>
//   <Switch>
//     <Route path="/" exact component={Home} />
//     { /* all unmatched routes */ }
//     <Route path="/login" exact component={Login} />
//     <Route component={NotFound} />
//   </Switch>;


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/register" exact component={Register} props={childProps} />
    { /* catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;