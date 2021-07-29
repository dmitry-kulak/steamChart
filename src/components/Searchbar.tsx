import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { ItemType } from "../types";
import "./Searchbar.css";

const Searchbar = ({ setItemList, itemList, isLogged, setIsLogged }: any) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      const response = await fetch("/api/items");

      if (response.status === 401) {
        setIsLogged(false);
        return;
      }

      const data = await response.json();

      setItemList(data.data);
    };

    loadItems();
  }, [setItemList]);

  const renderList = () => {
    const list = itemList.filter((item: any) => {
      if (text) {
        return (
          // I hate my life for this snippet of code
          item.marketHashName.toLowerCase().includes(text.toLowerCase()) ||
          (item.marketName || "").toLowerCase().includes(text.toLowerCase())
        );
      } else {
        return null;
      }
    });

    // console.log(list);

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
