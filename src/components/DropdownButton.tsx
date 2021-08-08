import React from "react";
import Dropdown, { Option } from "react-dropdown";

import "react-dropdown/style.css";
import "./DropdownButton.css"
import { ItemInformation } from "../types";

const DropdownButton = ({
  itemList,
  itemCategory,
  itemType,
  setItemCategory,
  setItemType,
}: {
  itemList: ItemInformation[] | undefined;
  itemCategory?: Option;
  itemType?: Option;
  setItemCategory?: any;
  setItemType?: any;
}) => {
  let options;
  let defaultOption;

  if (setItemCategory) {
    options = itemList!.map((item) => item.itemCategory || "Без категории");
    options.unshift("Любая категория");
    options = [...new Set(options)];

    defaultOption = options[0];

    return (
      <Dropdown
        onChange={setItemCategory}
        value={itemCategory || defaultOption}
        options={options}
      />
    );
  } else {
    options = itemList!.map((item) => item.itemType || "Без типа");
    options.unshift("Любой тип");
    options = [...new Set(options)];

    defaultOption = options[0];

    return (
      <Dropdown
        onChange={setItemType}
        value={itemType || defaultOption}
        options={options}
      />
    );
  }
};

export default DropdownButton;
