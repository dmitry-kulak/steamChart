import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { FormValues, ItemInformation } from "../types";

import Chart from "./Chart";
import ItemForm from "./ItemForm";

const Item = ({
  itemList,
  isLogged,
  setIsLogged,
}: {
  itemList: ItemInformation[];
  isLogged: boolean;
  setIsLogged: any;
}) => {
  // id from url
  const { id } = useParams<{ id: string }>();
  const [itemData, setItemData] = useState<ItemInformation | undefined>();
  const [formData, setFormData] = useState<FormValues>({
    currency: "rub",
    deals: false,
    orders: false,
    lots: true,
    online: "none",
  });

  // find item in data array by id from url
  useEffect(() => {
    const itemFromId = itemList.find(
      (elem: ItemInformation) => elem.id === Number(id)
    );

    setItemData(itemFromId);
  }, [itemList, id, formData]);

  // setFormData from ulr if there's any query parameters
  // eg you clicked link with parameters
  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    if (query.toString()) {
      for (let param of query.entries()) {
        param[1] =
          param[1] === "true" || param[1] === "false"
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

    for (let key in formData) {
      params.append(String(key), formData[key]);
    }

    history.push({ search: params.toString() });
  }, [formData, history]);

  return (
    <div>
      <h3>
        Предмет: {itemData?.marketHashName}{" "}
        {itemData?.marketName ? `| ${itemData?.marketName}` : null}
      </h3>
      <ItemForm formData={formData} setFormData={setFormData} />
      <Chart isLogged={isLogged} setIsLogged={setIsLogged} formData={formData} id={id} />
    </div>
  );
};

export default Item;
