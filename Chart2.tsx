/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CryptoXor } from 'crypto-xor';
import { Line, Chart as Chartjs } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import {
  ChartProps,
  ChartState,
  ItemData,
  ItemDataResponse,
} from './client/src/types';
import { colors } from './client/src/utils';
import zoomPlugin from 'chartjs-plugin-zoom';

import './Chart.css';

Chartjs.register([zoomPlugin]);

type SteamType = 'players' | 'steamOnline' | 'twitchViewers' | 'totalPlayers';

class Chart extends React.Component<ChartProps, ChartState> {
  state: ChartState = {
    itemData: {
      dates: [],
      priceRub: [],
      priceUsd: [],
      dealsQty: [],
      ordersRub: [],
      ordersUsd: [],
      lotsRub: [],
      lotsUsd: [],
      gameConcurrentInGame: [],
      steamConcurrentOnline: [],
      gameConcurrentTwitchViewers: [],
      steamConcurrentInGame: [],
      startDate: null,
    },

    data: {
      labels: [],
      datasets: [],
    },
    options: {
      spanGaps: true,
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },

      scales: {
        x: { type: 'time', ticks: { maxRotation: 0, autoSkipPadding: 10 } },
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
          limits: { x: { max: new Date().getTime() } },
        },
      },
    },
  };

  fetchData = async () => {
    const response = await fetch(`/api/chart/${this.props.id}`);

    let data = await response.json();
    const startDate = data.startDate;

    data = JSON.parse(data);

    const dates = data.map((item: ItemDataResponse) => item.date);
    const priceRub = data.map((item: ItemDataResponse) => item.priceRub);
    const priceUsd = data.map((item: ItemDataResponse) => item.priceUsd);
    const dealsQty = data.map((item: ItemDataResponse) => item.dealsQty);
    const ordersRub = data.map((item: ItemDataResponse) => item.ordersRub);
    const ordersUsd = data.map((item: ItemDataResponse) => item.ordersUsd);
    const lotsRub = data.map((item: ItemDataResponse) => item.lotsRub);
    const lotsUsd = data.map((item: ItemDataResponse) => item.lotsUsd);
    const gameConcurrentInGame = data.map(
      (item: ItemData) => item.gameConcurrentInGame
    );
    const steamConcurrentOnline = data.map(
      (item: ItemData) => item.steamConcurrentOnline
    );
    const gameConcurrentTwitchViewers = data.map(
      (item: ItemData) => item.gameConcurrentTwitchViewers
    );
    const steamConcurrentInGame = data.map(
      (item: ItemData) => item.steamConcurrentInGame
    );

    this.setState({
      itemData: {
        dates: dates,
        priceRub: priceRub,
        priceUsd: priceUsd,
        dealsQty: dealsQty,
        ordersRub: ordersRub,
        ordersUsd: ordersUsd,
        lotsRub: lotsRub,
        lotsUsd: lotsUsd,
        gameConcurrentInGame: gameConcurrentInGame,
        steamConcurrentOnline: steamConcurrentOnline,
        gameConcurrentTwitchViewers: gameConcurrentTwitchViewers,
        steamConcurrentInGame: steamConcurrentInGame,
        startDate: startDate,
      },
    });
  };

  updateDealsSeries = (props: any) => {
    const newSeriesDeals = [];
    const { currency, deals, orders, lots } = props;
    const fillObj = { target: 'origin' };

    const getCurrencyName = () => {
      return currency[0].toUpperCase() + currency.slice(1);
    };

    const getCurrencyDataValueName = () => {
      if (lots) {
        return `lots${getCurrencyName()}`;
      }

      if (orders) {
        return `orders${getCurrencyName()}`;
      }

      return `price${getCurrencyName()}`;
    };

    const getYAxisID = () => {
      return deals || lots || orders ? 'y-axis-steam' : 'y-axis-currency';
    };

    const getBaseObj = (label?: String) => {
      return {
        type: 'line',
        // @ts-ignore
        data: this.state.itemData[getCurrencyDataValueName()],
        label: label || `Цена ${currency === 'rub' ? '₽' : '$'}`,
        borderColor: colors.currency,
        yAxisID: getYAxisID(),
      };
    };

    const getDealsObj = (label: String) => {
      const dealsObj = getBaseObj(label);
      dealsObj.data = this.state.itemData.dealsQty;
      dealsObj.borderColor = colors.deals;

      return dealsObj;
    };

    const getOrdersObj = (label: String) => {
      const ordersObj = getBaseObj(label);
      // @ts-ignore
      ordersObj.fill = fillObj;
      // @ts-ignore
      ordersObj.backgroundColor = colors.ordersBackground;
      ordersObj.borderColor = colors.orders;

      return ordersObj;
    };

    const getLotsObj = (label: String) => {
      const lotsObj = getBaseObj(label);
      // @ts-ignore
      lotsObj.backgroundColor = colors.lotsBackground;
      lotsObj.borderColor = colors.lots;

      return lotsObj;
    };

    newSeriesDeals.push(getBaseObj());

    if (deals) {
      newSeriesDeals.push(getDealsObj('Количество сделок'));
    }

    if (orders) {
      newSeriesDeals.push(getOrdersObj('Запросов на покупку'));
    }

    if (lots) {
      newSeriesDeals.push(getLotsObj('Лотов на продажу'));
    }

    return newSeriesDeals;
  };

  updateUsersSeries = (props: any) => {
    const newSeriesUsers = [];
    const { players, steamOnline, twitchViewers, totalPlayers } = props;

    const steamValueName = {
      players: 'gameConcurrentInGame',
      steamOnline: 'steamConcurrentOnline',
      twitchViewers: 'gameConcurrentTwitchViewers',
      totalPlayers: 'steamConcurrentInGame',
    };

    const getResObj = (label: String, type: SteamType) => {
      return {
        label,
        type: 'line',
        yAxisID: 'y-axis-steamdb',
        // @ts-ignore
        data: this.state.itemData[steamValueName(type)],
        // @ts-ignore
        borderColor: colors[steamValueName(type)],
      };
    };

    if (players) {
      newSeriesUsers.push(getResObj('Количество в игре', 'players'));
    }

    if (steamOnline) {
      newSeriesUsers.push(getResObj('Общий онлайн Steam', 'steamOnline'));
    }

    if (twitchViewers) {
      newSeriesUsers.push(
        getResObj('Количество зрителей в Twitch', 'twitchViewers')
      );
    }

    if (totalPlayers) {
      newSeriesUsers.push(
        getResObj('Общее количество играющих', 'totalPlayers')
      );
    }

    return newSeriesUsers;
  };

  async componentDidMount() {
    await this.fetchData();

    document.getElementsByClassName('chart')[0].classList.add('hide'); // hack
    this.setState({
      data: {
        labels: this.state.itemData.dates,
        datasets: [
          ...this.updateDealsSeries(this.props.formData),
          ...this.updateUsersSeries(this.props.formData),
        ],
      },
      options: {
        ...this.state.options,
        plugins: {
          ...this.state.options.plugins,
          zoom: {
            ...this.state.options.plugins.zoom,
            limits: {
              x: {
                ...this.state.options.plugins.zoom.limits.x,
                min: this.state.itemData.startDate,
              },
            },
          },
        },
      },
    });
  }

  async componentDidUpdate(prevProps: ChartProps) {
    let flag = false;

    if (
      JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)
    ) {
      flag = true;
    }

    if (prevProps.id !== this.props.id) {
      await this.fetchData();
      flag = true;
    }

    if (flag) {
      document.getElementsByClassName('chart')[0].classList.add('hide'); // hack
      this.setState({
        data: {
          labels: this.state.itemData.dates,
          datasets: [
            ...this.updateDealsSeries(this.props.formData),
            ...this.updateUsersSeries(this.props.formData),
          ],
        },
      });
    }
  }

  render() {
    return (
      <div className='chart'>
        <Line
          ref={this.componentRef}
          options={this.state.options}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default Chart;
