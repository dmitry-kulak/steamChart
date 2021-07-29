import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { ItemType } from "../types";
import { fetchWithErrorCheck } from "../utils";
import "./Searchbar.css";

const Searchbar = ({ setItemList, itemList, isLogged, setIsLogged }: any) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchWithErrorCheck("/api/items", setIsLogged);

      setItemList(data);
    };

    if (isLogged) fetchItems();
  }, [isLogged, setIsLogged, setItemList]);

  const renderList = () => {
    const list = itemList.filter((item: any) => {
      if (text) {
        return (
          // I hate my life for this snippet of code
          // if there's no russian name for item (marketName) it doesn't render it
          item.marketHashName.toLowerCase().includes(text.toLowerCase()) ||
          (item.marketName || "").toLowerCase().includes(text.toLowerCase())
        );
      } else {
        return null;
      }
    });

    const mappedList = list.map((item: ItemType) => {
      return (
        <li key={item.id}>
          <Link onClick={() => setText("")} to={`/item/${String(item.id)}`}>
            {item.marketName}
          </Link>
        </li>
      );
    });

    return mappedList;
  };

  if (!isLogged) return <Redirect push to="/login" />;

  return (
    <div className="Searchbar">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Найти предмет"
      />
      <ul> {itemList ? renderList() : "Предметы не были загружены"}</ul>
    </div>
  );
};

export default Searchbar;
