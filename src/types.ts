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
  buyQtyRub?: number[];
  buyQtyUsd?: number[];
  sellQtyRub?: number[];
  sellQtyUsd?: number[];
  gameConcurrentInGame?: number[];
  steamConcurrentOnline?: number[];
  twitchConcurrentViewers?: number[];
  steamConcurrentInGame?: number[];
}

export interface Series {
  data: number[] | undefined;
  name: string;
  type: string;
}

export interface GraphState {
  itemData: ItemData;
  series: Series[];
  options: any;
}
