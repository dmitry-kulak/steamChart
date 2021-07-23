import React, { useEffect, useState } from "react";
import { ItemType } from "../types";

const Searchbar = ({ setItemList, itemList }: any) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      const response = await fetch("http://94.19.34.183:4567/api/items");

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
      return <li key={item.id}>{item.marketName}</li>;
    });

    return mappedList;
  };

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} value={text} />
      <ul> {renderList()}</ul>
    </div>
  );
};

export default Searchbar;
