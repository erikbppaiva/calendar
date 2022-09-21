/** @format */
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { getUserEventEndPoint, IUser } from "./backend";
import CalenderScreen from "./CalenderScreen";
import { getToday } from "./dateFunctions";
import { LoginScreen } from "./LoginScreen";
import { userContext, singOutContext } from "./authContext";

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEventEndPoint().then(setUser, singOut);
  }, []);
  function singOut() {
    setUser(null);
  }
  if (user) {
    return (
      <userContext.Provider value={user}>
        <singOutContext.Provider value={singOut}>
          <Router>
            <Switch>
              <Route path="/calendar/:month">
                <CalenderScreen onSigOut={singOut} />
              </Route>
              <Redirect to={{ pathname: "/calendar/" + month }}></Redirect>
            </Switch>
          </Router>
        </singOutContext.Provider>
      </userContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;

//TERMINEI EM AULA 9.2 2:05min
