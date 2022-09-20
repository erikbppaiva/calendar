/** @format */
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { getUserEventEndPoint } from "./backend";
import CalenderScreen from "./CalenderScreen";
import { getToday } from "./dateFunctions";
import { LoginScreen } from "./LoginScreen";

function App() {
  const month = getToday().substring(0, 7);

  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    getUserEventEndPoint().then(
      () => setHasSession(true),
      () => setHasSession(false)
    );
  }, []);

  if (hasSession) {
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
  } else {
    return <LoginScreen />;
  }
}

export default App;
