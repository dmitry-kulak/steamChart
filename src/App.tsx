import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Searchbar from "./components/Searchbar";
import { ItemType } from "./types";
import Item from "./components/Item";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  const [itemList, setItemList] = useState<ItemType[] | undefined>([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      response.status === 401 ? setIsLogged(false) : setIsLogged(true);
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    fetch("/api/logout");
    setIsLogged(false);
  };

  const renderLoginButton = () => {
    if (!isLogged) {
      return <Link to="/login">Войти</Link>;
    } else {
      return <button onClick={logout}>Выйти</button>;
    }
  };

  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar App-Searchbar">
          <Link to="/">Домой</Link>
          <Searchbar
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            itemList={itemList}
            setItemList={setItemList}
          />
          {renderLoginButton()}
        </nav>
        <Switch>
          <Route
            exact
            path="/item/:id"
            render={(props) => <Item itemList={itemList as ItemType[]} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login isLogged={isLogged} setIsLogged={setIsLogged} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
