export interface ItemType {
  id: number;
  marketHashName: string;
  marketName: string;
}

export interface FormValues {
  currency?: string;
  deals?: boolean;
  lots?: boolean;
  orders?: boolean;
  online?: string;
  [key: string]: any;
}

export interface ItemData {
  date?: number;
  priceRub?: number[];
  priceUsd?: number[];
  dealsQty?: number[];
  ordersRub?: number[];
  ordersUsd?: number[];
  lotsRub?: number[];
  lotsUsd?: number[];
  gameConcurrentInGame?: number[];
  steamConcurrentOnline?: number[];
  gameConcurrentTwitchViewers?: number[];
  steamConcurrentInGame?: number[];
}

export interface Series {
  data: number[] | undefined;
  name: string;
  type: string;
}

export interface GraphState {
  itemData: ItemData;
  seriesDeals: Series[],
  seriesUsers: Series[],
  optionsDeals: any;
  optionsUsers: any;
}