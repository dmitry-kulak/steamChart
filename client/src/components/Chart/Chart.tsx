import React from 'react';
import { Line, Chart as Chartjs } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import {
  ChartProps,
  ChartState,
  FormValues,
  ItemData,
  ItemDataResponse,
  Series,
} from '../../types';
import { addSeries, chartOptions, colors } from '../../utils';
import zoomPlugin from 'chartjs-plugin-zoom';

import './Chart.css';

Chartjs.register([zoomPlugin]);

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
    options: chartOptions,
  };

  async componentDidMount() {
    await this.fetchData();
    this.updateChart();
  }

  async componentDidUpdate(prevProps: ChartProps) {
    if (prevProps.id !== this.props.id) {
      await this.fetchData();
      return this.updateChart();
    }

    if (
      JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)
    ) {
      return this.updateChart();
    }
  }

  fetchData = async () => {
    const response = await fetch(`/api/chart/${this.props.id}`);
    let data = await response.json();
    const startDate = data.startDate;
    data = data.data;
    console.log(data);

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

  updateDealsSeries = (formData: FormValues) => {
    const { currency, deals, orders, lots } = formData;
    const newDeals: Series[] = [];

    const getCurrencyName = () => {
      return currency[0].toUpperCase() + currency.slice(1);
    };

    const addCurrency = addSeries(newDeals, colors.currency, 'y-axis-currency');
    const addDeals = addSeries(newDeals, colors.deals, 'y-axis-steam');
    const addOrders = addSeries(newDeals, colors.orders, 'y-axis-steam');
    const addLots = addSeries(newDeals, colors.lots, 'y-axis-steam');

    addCurrency(
      this.state.itemData[`price${getCurrencyName()}`],
      `Цена ${currency === 'rub' ? '₽' : '$'}`
    );

    if (deals) {
      addDeals(this.state.itemData.dealsQty, 'Количество сделок');
    }

    if (orders) {
      addOrders(
        this.state.itemData[`orders${getCurrencyName()}`],
        'Запросов на покупку'
      );
    }

    if (lots) {
      addLots(
        this.state.itemData[`lots${getCurrencyName()}`],
        'Лотов на продажу'
      );
    }

    return newDeals;
  };

  updateUsersSeries = (formData: FormValues) => {
    const { players, steamOnline, twitchViewers, totalPlayers } = formData;
    const newUsers: Series[] = [];

    const addIngame = addSeries(
      newUsers,
      colors.gameConcurrentInGame,
      'y-axis-steamdb'
    );
    const addOnline = addSeries(
      newUsers,
      colors.steamConcurrentOnline,
      'y-axis-steamdb'
    );
    const addViewers = addSeries(
      newUsers,
      colors.gameConcurrentTwitchViewers,
      'y-axis-steamdb'
    );
    const addTotalPlayers = addSeries(
      newUsers,
      colors.gameConcurrentTwitchViewers,
      'y-axis-steamdb'
    );

    if (players) {
      addIngame(this.state.itemData.gameConcurrentInGame, 'Количество в игре');
    }

    if (steamOnline) {
      addOnline(
        this.state.itemData.steamConcurrentOnline,
        'Общий онлайн Steam'
      );
    }

    if (twitchViewers) {
      addViewers(
        this.state.itemData.gameConcurrentTwitchViewers,
        'Количество зрителей в Twitch'
      );
    }

    if (totalPlayers) {
      addTotalPlayers(
        this.state.itemData.steamConcurrentInGame,
        'Общее количество играющих'
      );
    }

    return newUsers;
  };

  updateChart = async () => {
    this.setState({
      data: {
        labels: this.state.itemData.dates,
        datasets: [
          ...this.updateDealsSeries(this.props.formData),
          ...this.updateUsersSeries(this.props.formData),
        ],
      },
    });
  };

  render() {
    return <Line options={this.state.options} data={this.state.data} />;
  }
}

export default Chart;
