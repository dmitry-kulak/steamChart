import React, { useEffect } from "react";
import Dropdown, { Option } from "react-dropdown";

import "react-dropdown/style.css";
import "./DropdownButton.css";
import { ItemInformation } from "../../types";

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
    // Category is selected

    options = itemList!.map((item) => item.itemCategory || "Без категории");
    options = [...new Set(options)];
    options.sort();
    options.unshift("Любая категория");

    defaultOption = options[0];

    return (
      <Dropdown
        onChange={setItemCategory}
        value={itemCategory || defaultOption}
        options={options}
      />
    );
  } else {
    // Type is selected

    // Filter types belonging to the selected category
    options = itemList!.map((item) => {
      if (
        itemCategory?.value === "Любая категория" ||
        item.itemCategory === itemCategory?.value
      ) {
        return item.itemType || "Без типа";
      } else {
        return ""; // Remove later
      }
    });
    options = [...new Set(options)];
    if (options.includes("")) {
      options.splice(options.indexOf(""), 1); // Removed
    }
    options.sort();
    options.unshift("Любой тип");

    defaultOption = options[0];

    // I really don't like it
    let value = itemType || defaultOption;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.log('dropdown')

      setItemType({
        label: "Любой тип",
        value: "Любой тип",
      });
    }, [itemCategory, setItemType]);

    return <Dropdown onChange={setItemType} value={value} options={options} />;
  }
};

export default DropdownButton;
