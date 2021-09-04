import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { FormValues, ItemInformation } from '../../types';

import Chart from '../Chart/Chart';
import ItemForm from '../ItemForm/ItemForm';
import './Item.css';

const Item = ({ itemList }: { itemList: ItemInformation[] }) => {
  // id from url
  const { id } = useParams<{ id: string }>();
  const [itemInformation, setItemInformation] = useState<
    ItemInformation | undefined
  >();
  const [formData, setFormData] = useState<FormValues>({
    currency: 'rub',
    deals: false,
    orders: false,
    lots: true,
    players: false,
    twitchViewers: false,
    steamOnline: false,
    totalPlayers: false,
  });

  // find item in data array by id from url
  useEffect(() => {
    const itemFromId = itemList.find(
      (elem: ItemInformation) => elem.id === Number(id)
    );

    setItemInformation(itemFromId);
  }, [itemList, id, formData]);

  // setFormData from URL if there's any query parameters
  // eg you clicked link with parameters
  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    if (query.toString()) {
      for (const param of query.entries()) {
        param[1] =
          param[1] === 'true' || param[1] === 'false'
            ? JSON.parse(param[1])
            : param[1];

        setFormData((formData) => {
          return { ...formData, [param[0]]: param[1] };
        });
      }
    }
  }, [setFormData]);

  // push formData to url
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams();

    for (const key in formData) {
      params.append(String(key), formData[key]);
    }

    history.push({ search: params.toString() });
  }, [formData, history]);

  const renderItemName = () => {
    if (!itemInformation) {
      return 'Загрузка ...';
    }

    return itemInformation?.marketName
      ? itemInformation?.marketName
      : itemInformation?.marketHashName;
  };

  return (
    <div className='item'>
      <h3 title={itemInformation?.marketHashName}>{renderItemName()}</h3>
      <ItemForm formData={formData} setFormData={setFormData} />
      <Chart formData={formData} id={id} />
    </div>
  );
};

export default Item;
