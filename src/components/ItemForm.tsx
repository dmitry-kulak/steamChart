import React from "react";

import { FormValues } from "../types";

// i could use formik but didn't figured out how to change state in Item component on change so this abomination

const ItemForm = ({
  formData,
  setFormData,
}: {
  formData: FormValues;
  setFormData: CallableFunction;
}) => {

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <form>
      <label>
        Валюта:
        <input
          type="radio"
          name="currency"
          value="rub"
          checked={formData.currency === "rub"}
          onChange={(e) => handleRadioChange(e, "currency")}
        />
        ₽
      </label>
      <label>
        <input
          type="radio"
          name="currency"
          value="usd"
          checked={formData.currency === "usd"}
          onChange={(e) => handleRadioChange(e, "currency")}
        />
        $
      </label>

      <label>
        <input
          type="checkbox"
          name="orders"
          checked={formData.orders}
          onChange={() =>
            setFormData({ ...formData, orders: !formData.orders })
          }
        />
        Запросы на покупку
      </label>
      <label>
        <input
          type="checkbox"
          name="lots"
          checked={formData.lots}
          onChange={() => setFormData({ ...formData, lots: !formData.lots })}
        />
        Лотов в продаже
      </label>
      <label>
        <input
          type="checkbox"
          name="deals"
          checked={formData.deals}
          onChange={() => setFormData({ ...formData, deals: !formData.deals })}
        />
        Количество сделок
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="online"
          value="gameConcurrentInGame"
          checked={formData.online === "gameConcurrentInGame"}
          onChange={(e) => handleRadioChange(e, "online")}
        />
        Количество в игре (CS:GO)
      </label>
      <label>
        <input
          type="radio"
          name="online"
          value="twitchConcurrentViewers"
          checked={formData.online === "twitchConcurrentViewers"}
          onChange={(e) => handleRadioChange(e, "online")}
        />
        Количество зрителей в Twitch (CS:GO)
      </label>
      <label>
        <input
          type="radio"
          name="online"
          value="steamConcurrentOnline"
          checked={formData.online === "steamConcurrentOnline"}
          onChange={(e) => handleRadioChange(e, "online")}
        />
        Общий онлайн Steam
      </label>
      <label>
        <input
          type="radio"
          name="online"
          value="steamConcurrentInGame"
          checked={formData.online === "steamConcurrentInGame"}
          onChange={(e) => handleRadioChange(e, "online")}
        />
        Общее количество играющих
      </label>
      <label>
        <input
          type="radio"
          name="online"
          value="none"
          checked={formData.online === "none"}
          onChange={(e) => handleRadioChange(e, "online")}
        />
        Выключить
      </label>
    </form>
  );
};

export default ItemForm;
