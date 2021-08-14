import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Searchbar from "./components/Searchbox/Searchbar";
import { ItemInformation } from "./types";
import Item from "./components/Item/Item";
import Login from "./components/Login/Login";
import { fetchWithErrorCheck } from "./utils";
import "./App.css";
import { Home, Logout, LoginIcon } from "./components/Icon/Icon";

const IS_LOGGED = Boolean(localStorage.getItem('IS_LOGGED'))

const App = () => {
  const [itemList, setItemList] = useState<ItemInformation[] | undefined>([]);
  const [isLogged, setIsLogged] = useState<boolean>(IS_LOGGED);

  useEffect(() => {
    fetchWithErrorCheck("/api/profile", setIsLogged);
  }, []);

  const logout = () => {
    fetch("/api/logout");
    setIsLogged(false);
    localStorage.clear();
  };

  const renderLoginButton = () => {
    if (isLogged) {
      return <div onClick={logout} title="Выйти">
        <Logout />
      </div>
    } else {
      return <Link to="/login"><LoginIcon /></Link>
    }
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/" title="Домой">
            <Home />
          </Link>
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
            render={(props) => (
              <Item
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                itemList={itemList as ItemInformation[]}
              />
            )}
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
