import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Searchbar from "./components/Searchbar";
import { ItemInformation } from "./types";
import Item from "./components/Item";
import Login from "./components/Login";
import { fetchWithErrorCheck } from "./utils";
import "./App.css";

const App = () => {
  const [itemList, setItemList] = useState<ItemInformation[] | undefined>([]);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      fetchWithErrorCheck("/api/profile", setIsLogged);
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    fetch("/api/logout");
    setIsLogged(false);
  };

  const renderLoginButton = () => {
    if (isLogged) {
      return <button onClick={logout}>Выйти</button>;
    }
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <button>
            <Link to="/">Домой</Link>
          </button>
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
