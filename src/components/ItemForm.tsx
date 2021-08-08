import React from "react";

import { FormValues } from "../types";

const ItemForm = ({
  formData,
  setFormData,
}: {
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case "radio":
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;

      case "checkbox":
        setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
        break;
    }
  };

  return (
    <form>
      <div className="currency">
        <label>
          Валюта:
          <input
            type="radio"
            name="currency"
            value="rub"
            checked={formData.currency === "rub"}
            onChange={(e) => handleInputChange(e)}
          />
          ₽
        </label>
        <label>
          <input
            type="radio"
            name="currency"
            value="usd"
            checked={formData.currency === "usd"}
            onChange={(e) => handleInputChange(e)}
          />
          $
        </label>
      </div>
      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            name="orders"
            checked={formData.orders}
            onChange={(e) => handleInputChange(e)}
          />
          Запросов на покупку
        </label>
        <label>
          <input
            type="checkbox"
            name="lots"
            checked={formData.lots}
            onChange={(e) => handleInputChange(e)}
          />
          Лотов на продажу
        </label>
        <label>
          <input
            type="checkbox"
            name="deals"
            checked={formData.deals}
            onChange={(e) => handleInputChange(e)}
          />
          Количество сделок
        </label>
      </div>

      <br />

      <div className="people">
        <label>
          <input
            type="checkbox"
            name="players"
            checked={formData.players}
            onChange={(e) => handleInputChange(e)}
          />
          Количество в игре (CS:GO)
        </label>
        <label>
          <input
            type="checkbox"
            name="twitchViewers"
            checked={formData.twitchViewers}
            onChange={(e) => handleInputChange(e)}
          />
          Количество зрителей в Twitch (CS:GO)
        </label>
        <label>
          <input
            type="checkbox"
            name="steamOnline"
            checked={formData.steamOnline}
            onChange={(e) => handleInputChange(e)}
          />
          Общий онлайн Steam
        </label>
        <label>
          <input
            type="checkbox"
            name="totalPlayers"
            checked={formData.totalPlayers}
            onChange={(e) => handleInputChange(e)}
          />
          Общее количество играющих
        </label>
      </div>
    </form>
  );
};

export default ItemForm;