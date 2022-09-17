/** @format */

import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CalenderScreen from "./CalenderScreen";
import { getToday } from "./dateFunctions";

function App() {
  const month = getToday().substring(0, 7);
  return (
    <Router>
      <Switch>
        <Route path="/calendar/:month">
          <CalenderScreen />
        </Route>
        <Redirect to={{ pathname: "/calendar/" + month }}></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
