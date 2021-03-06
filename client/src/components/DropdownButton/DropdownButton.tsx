import React, { useEffect } from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import './DropdownButton.css';
import { DropdownButtonProps } from '../../types';

const DropdownButton = ({
  itemList,
  itemCategory,
  itemType,
  setItemCategory,
  setItemType,
}: DropdownButtonProps) => {
  let options;
  let defaultOption;

  if (setItemCategory) {
    // Category is selected

    options = itemList!.map((item) => item.itemCategory || 'Без категории');
    options = [...new Set(options)];
    options.sort();
    options.unshift('Любая категория');

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
        itemCategory?.value === 'Любая категория' ||
        itemCategory?.value === item.itemCategory
      ) {
        return item.itemType || 'Без типа';
      } else {
        return ''; // Remove later
      }
    });

    options = [...new Set(options)];
    if (options.includes('')) {
      options.splice(options.indexOf(''), 1);
    }
    options.sort();
    options.unshift('Любой тип');

    defaultOption = options[0];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setItemType({
        label: 'Любой тип',
        value: 'Любой тип',
      });
    }, [itemCategory, setItemType]);

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
