import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Searchbar from './components/Searchbox/Searchbar';
import { ItemInformation } from './types';
import Item from './components/Item/Item';

import './App.css';
import { Home } from './components/Icon/Icon';

const App = () => {
  const [itemList, setItemList] = useState<ItemInformation[] | undefined>([]);

  return (
    <Router>
      <div className='container'>
        <nav className='navbar'>
          <Link to='/' title='Домой'>
            <Home />
          </Link>
          <Searchbar itemList={itemList} setItemList={setItemList} />
          <span></span>
        </nav>
        <Switch>
          <Route
            exact
            path='/item/:id'
            render={(props) => (
              <Item itemList={itemList as ItemInformation[]} />
            )}
          />
          <Route
            exact
            path='/'
            render={(props) => (
              <div className='message'>Предмет не выбран.</div>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
