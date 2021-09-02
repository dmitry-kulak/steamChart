import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Option } from "react-dropdown";

import { ItemInformation } from "../../types";
import {
  fetchWithErrorCheck,
  filterItem,
  highlightEnglishChars,
} from "../../utils";
import DropdownButton from "../DropdownButton/DropdownButton";
import "./Searchbar.css";

const Searchbar = ({
  itemList,
  setItemList,
  isLogged,
  setIsLogged,
}: {
  itemList: ItemInformation[] | undefined;
  setItemList: React.Dispatch<
    React.SetStateAction<ItemInformation[] | undefined>
  >;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<Option>({
    label: "Любая категория",
    value: "Любая категория",
  });
  const [itemType, setItemType] = useState<Option>({
    label: "Любой тип",
    value: "Любой тип",
  });
  const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);

  const mapList = (list: ItemInformation[]) => {
    return list.map((item: ItemInformation) => {
      return (
        <li key={item.id}>
          <Link onClick={() => setText("")} to={`/item/${String(item.id)}`}>
            {highlightEnglishChars(item.marketName || item.marketHashName)}
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchWithErrorCheck("/api/items", setIsLogged);

      if (!data) return;

      const dataWithReplacedNulls = data.map((item: ItemInformation) => {
        item.itemCategory =
          item.itemCategory === null ? "Без категории" : item.itemCategory;
        item.itemType =
          item.itemType === null ? "Без категории" : item.itemType;

        return item;
      });

      setItemList(dataWithReplacedNulls);
    };

    if (isLogged) fetchItems();
  }, [isLogged, setIsLogged, setItemList]);

  // filter by text input
  useEffect(() => {
    const list = itemList!.filter((item: ItemInformation) => {
      return filterItem(text, item.marketHashName, item.marketName);
    });

    setSearchResults(mapList(list));
  }, [text, itemList, setSearchResults]);

  // filter by category
  useEffect(() => {
    let list: ItemInformation[] = itemList!;

    if (itemCategory.value !== "Любая категория") {
      list = itemList!.filter((item: ItemInformation) => {
        return (
          itemCategory.value === "Любая категория" ||
          itemCategory.value === item.itemCategory
        );
      });
    }

    if (itemType.value !== "Любой тип") {
      list = itemList!.filter((item: ItemInformation) => {
        return (
          itemType.value === "Любой тип" || itemType.value === item.itemType
        );
      });
    }

    setSearchResults(mapList(list));
  }, [itemList, itemCategory, itemType, setSearchResults]);

  // filter by type
  // useEffect(() => {
  //   const list = itemList!.filter((item: ItemInformation) => {
  //     return itemType.value === "Любой тип" || item.itemType === itemType.value;
  //   });

  //   setSearchResults(mapList(list));
  // }, [itemList, itemType, setSearchResults]);

  if (!isLogged) return <Redirect push to="/login" />;

  return (
    <div className="searchbar-container">
      <DropdownButton
        itemList={itemList}
        itemCategory={itemCategory}
        setItemCategory={setItemCategory}
      />

      <div className="searchbar">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Найти предмет"
        />
        <ul> {searchResults ? searchResults : "Предметы не были загружены"}</ul>
      </div>
      <DropdownButton
        itemList={itemList}
        itemType={itemType}
        itemCategory={itemCategory}
        setItemType={setItemType}
      />
    </div>
  );
};

export default Searchbar;
