import { Option } from 'react-dropdown';
import React from "react";

export interface ItemInformation {
  appid: number;
  id: number;
  marketHashName: string;
  marketName: string;
  itemCategory: string;
  itemType: string;
}

export interface FormValues {
  currency: string;
  deals: boolean;
  lots: boolean;
  orders: boolean;
  players: boolean;
  twitchViewers: boolean;
  steamOnline: boolean;
  totalPlayers: boolean;
  [key: string]: any;
}

export interface ItemData {
  dates: number[];
  priceRub: number[];
  priceUsd: number[];
  dealsQty: number[];
  ordersRub: number[];
  ordersUsd: number[];
  lotsRub: number[];
  lotsUsd: number[];
  gameConcurrentInGame: number[];
  steamConcurrentOnline: number[];
  gameConcurrentTwitchViewers: number[];
  steamConcurrentInGame: number[];
  startDate: number | null;
  [key: string]: any;
}

export interface ItemDataResponse {
  date: number;
  priceRub: number;
  priceUsd: number;
  dealsQty: number;
  ordersRub: number;
  ordersUsd: number;
  lotsRub: number;
  lotsUsd: number;
  gameConcurrentInGame: number;
  steamConcurrentOnline: number;
  gameConcurrentTwitchViewers: number;
  steamConcurrentInGame: number;

}

export interface ChartProps {
  formData: FormValues;
  id: string;
}

export interface ChartState {
  itemData: ItemData;
  data: any;
  options: any;
}

export interface SearchbarProps {
  itemList: ItemInformation[] | undefined;
  setItemList: React.Dispatch<
    React.SetStateAction<ItemInformation[] | undefined>
  >;
}
export interface ItemFormProps {
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

export interface DropdownButtonProps {
  itemList: ItemInformation[] | undefined;
  itemCategory?: Option;
  itemType?: Option;
  setItemCategory?: any;
  setItemType?: any;
}

export type Label =
  | 'Цена ₽'
  | 'Цена $'
  | 'Количество сделок'
  | 'Запросов на покупку'
  | 'Лотов на продажу'
  | 'Количество в игре'
  | 'Общий онлайн Steam'
  | 'Количество зрителей в Twitch'
  | 'Общее количество играющих';

export type yAxisID = 'y-axis-currency' | 'y-axis-steam' | 'y-axis-steamdb';
export interface Series {
  data: number[];
  label: Label;
  type: 'line';
  borderColor: string;
  yAxisID: yAxisID;
}
