import {Series, Label, yAxisID, ItemDataResponse} from '../types';

export const colors = {
  currency: '#6929c4',
  deals: '#1192e8',
  orders: '#005d5d',
  lots: '#9f1853',
  gameConcurrentInGame: '#fa4d56',
  gameConcurrentTwitchViewers: '#570408',
  steamConcurrentOnline: '#198038',
  steamConcurrentInGame: '#002d9c',
};

export const chartOptions = {
  spanGaps: true,
  responsive: true,
  animation: false,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },

  scales: {
    x: {type: 'time', ticks: {maxRotation: 0, autoSkipPadding: 10}},
    'y-axis-currency': {
      min: 0,
      position: 'right',
      title: {
        display: true,
        text: 'Цена',
      },
    },
    'y-axis-steam': {
      min: 0,
      title: {
        display: true,
        text: 'Количество запросов/лотов/сделок',
      },
    },
    'y-axis-steamdb': {
      min: 0,
      title: {
        display: true,
        text: 'Количество человек',
      },
    },
  },

  elements: {
    point: {
      radius: 0,
    },
  },

  plugins: {
    crosshair: {
      line: {
        color: 'black',
        width: 0.7,
        dashPattern: [5, 5],
      },
      zoom: {
        enabled: false,
      },
    },

    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        mode: 'x',
        wheel: {
          enabled: true,
        },
      },
      limits: {x: {max: new Date().getTime()}},
    },
  },
};

const escape = (x: string) => {
  return '\\^$*+?.()|{}[]'.includes(x) ? '\\' + x : x;
};

export const filterItem = (
  inputText: string,
  marketHashName: string,
  marketName: string | null
) => {
  const regex = new RegExp(
    inputText
      .split('')
      .map((x) => '(' + escape(x) + ').*')
      .join(''),
    'gi'
  );
  return (
    Boolean(marketHashName.match(regex)) ||
    Boolean((marketName || '').match(regex))
  );
};

export const addSeries = (
  series: Series[],
  color: string,
  yAxisID: yAxisID
) => {
  return (data: number[], label: Label) => {
    series.push({
      data: data,
      label: label,
      borderColor: color,
      yAxisID: yAxisID,
      type: 'line',
    });
  };
};

export const extractItemDataFrom = (responseData: ItemDataResponse[]) => {
  const dates = responseData.map((item: ItemDataResponse) => item.date);
  const priceRub = responseData.map((item: ItemDataResponse) => item.priceRub);
  const priceUsd = responseData.map((item: ItemDataResponse) => item.priceUsd);
  const dealsQty = responseData.map((item: ItemDataResponse) => item.dealsQty);
  const ordersRub = responseData.map((item: ItemDataResponse) => item.ordersRub);
  const ordersUsd = responseData.map((item: ItemDataResponse) => item.ordersUsd);
  const lotsRub = responseData.map((item: ItemDataResponse) => item.lotsRub);
  const lotsUsd = responseData.map((item: ItemDataResponse) => item.lotsUsd);
  const gameConcurrentInGame = responseData.map(
    (item: ItemDataResponse) => item.gameConcurrentInGame
  );
  const steamConcurrentOnline = responseData.map(
    (item: ItemDataResponse) => item.steamConcurrentOnline
  );
  const gameConcurrentTwitchViewers = responseData.map(
    (item: ItemDataResponse) => item.gameConcurrentTwitchViewers
  );
  const steamConcurrentInGame = responseData.map(
    (item: ItemDataResponse) => item.steamConcurrentInGame
  );

  return {
    dates,
    priceRub,
    priceUsd,
    dealsQty,
    ordersRub,
    ordersUsd,
    lotsRub,
    lotsUsd,
    gameConcurrentInGame,
    gameConcurrentTwitchViewers,
    steamConcurrentInGame,
    steamConcurrentOnline
  }
}
