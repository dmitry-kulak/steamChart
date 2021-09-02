export interface ItemInformation {
  appid: number;
  id: number;
  marketHashName: string;
  marketName: string;
  itemCategory: string;
  itemType: string;
}

export interface FormValues {
  currency?: string;
  deals?: boolean;
  lots?: boolean;
  orders?: boolean;
  players?: boolean;
  twitchViewers?: boolean;
  steamOnline?: boolean;
  totalPlayers?: boolean;
  id?: string;
  [key: string]: any;
}

export interface ItemData {
  dates?: number[];
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
}

export interface ItemDataResponse extends ItemData {
  date: number;
}

export interface ChartProps {
  formData: FormValues;
  isLogged: boolean;
  id: string;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChartState {
  itemData: ItemData;
  data: any;
  options?: any;
}
