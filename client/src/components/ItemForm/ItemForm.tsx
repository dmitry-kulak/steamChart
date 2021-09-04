import React from 'react';

import { ItemFormProps } from '../../types';
import './ItemForm.css';

const ItemForm = ({ formData, setFormData }: ItemFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case 'radio':
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;

      case 'checkbox':
        setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
        break;
    }
  };

  return (
    <form>
      <div className='currency'>
        <div>Валюта:</div>
        <label>
          <input
            type='radio'
            name='currency'
            value='rub'
            checked={formData.currency === 'rub'}
            onChange={(e) => handleInputChange(e)}
          />
          ₽
        </label>
        <label>
          <input
            type='radio'
            name='currency'
            value='usd'
            checked={formData.currency === 'usd'}
            onChange={(e) => handleInputChange(e)}
          />
          $
        </label>
      </div>
      <div className='checkboxes'>
        <div>Рынок:</div>
        <label>
          <input
            type='checkbox'
            name='deals'
            checked={formData.deals}
            onChange={(e) => handleInputChange(e)}
          />
          Количество сделок
        </label>
        <label>
          <input
            type='checkbox'
            name='orders'
            checked={formData.orders}
            onChange={(e) => handleInputChange(e)}
          />
          Запросов на покупку
        </label>
        <label>
          <input
            type='checkbox'
            name='lots'
            checked={formData.lots}
            onChange={(e) => handleInputChange(e)}
          />
          Лотов на продажу
        </label>
      </div>

      <div className='people'>
        <div>Игра (CS:GO):</div>
        <label>
          <input
            type='checkbox'
            name='players'
            checked={formData.players}
            onChange={(e) => handleInputChange(e)}
          />
          Количество в игре
        </label>
        <label>
          <input
            type='checkbox'
            name='twitchViewers'
            checked={formData.twitchViewers}
            onChange={(e) => handleInputChange(e)}
          />
          Количество зрителей в Twitch
        </label>
      </div>

      <div className='people'>
        <div>Steam:</div>
        <label>
          <input
            type='checkbox'
            name='totalPlayers'
            checked={formData.totalPlayers}
            onChange={(e) => handleInputChange(e)}
          />
          Общее количество играющих
        </label>
        <label>
          <input
            type='checkbox'
            name='steamOnline'
            checked={formData.steamOnline}
            onChange={(e) => handleInputChange(e)}
          />
          Общий онлайн
        </label>
      </div>
    </form>
  );
};

export default ItemForm;
