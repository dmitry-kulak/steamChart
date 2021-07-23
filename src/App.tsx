import React, { useState } from "react";

// import ItemForm from "./components/ItemForm";
// import Graph from "./components/Graph";
import Searchbar from "./components/Searchbar";
import { ItemType } from "./types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from "./components/Item";

const App = () => {
  const [itemList, setItemList] = useState<ItemType[] | undefined>([]);

  return (
    <Router>
      <div>
        <Searchbar itemList={itemList} setItemList={setItemList} />
        <Switch>
          <Route
            path="/item/:id"
            render={(props) => <Item itemList={itemList as ItemType[]} />}
          />
          {/* <ItemForm />
      <Graph /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
