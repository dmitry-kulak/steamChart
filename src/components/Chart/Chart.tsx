/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Redirect } from "react-router-dom";
import { CryptoXor } from "crypto-xor";
import { Line, Chart as Chartjs } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import {
  ChartProps,
  ChartState,
  ItemData,
  ItemDataResponse,
} from "../../types";
import {fetchWithErrorCheck, colors, getTimePeriod} from "../../utils";
import zoomPlugin from "chartjs-plugin-zoom";

import "./Chart.css";

Chartjs.register([zoomPlugin]);

class Chart extends React.Component<ChartProps, ChartState> {
  componentRef: React.RefObject<unknown> = React.createRef();

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
        mode: "index",
        intersect: false,
      },

      scales: {
        x: { type: "time", ticks: {maxRotation: 0, autoSkipPadding: 10} },
        "y-axis-currency": {
          min: 0,
          position: "right",
          title: {
            display: true,
            text: "Цена",
          },
        },
        "y-axis-steam": {
          min: 0,
          title: {
            display: true,
            text: "Количество запросов/лотов/сделок",
          },
        },
        "y-axis-steamdb": {
          min: 0,
          title: {
            display: true,
            text: "Количество человек",
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
            color: "black",
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
            mode: "x",
          },
          zoom: {
            mode: "x",
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
    const response = await fetchWithErrorCheck(
      `/api/chart/${this.props.id}`,
      this.props.setIsLogged,
      false
    );

    if (!this.props.isLogged) return <Redirect push to="/login" />;

    let data = await response.json();
    const startDate = data.startDate;

    data = CryptoXor.decrypt(data.data, "testPass");
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
    let newSeriesDeals = [];

    if (props.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.priceRub,
        label: "Цена ₽",
        type: "line",
        borderColor: colors.curr,
        yAxisID: "y-axis-currency",
      });
    }

    if (props.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.priceUsd,
        label: "Цена $",
        type: "line",
        borderColor: colors.curr,
        yAxisID: "y-axis-currency",
      });
    }

    if (props.deals) {
      newSeriesDeals.push({
        data: this.state.itemData.dealsQty,
        label: "Количество сделок",
        type: "line",
        borderColor: colors.deals,
        yAxisID: "y-axis-steam",
      });
    }

    if (props.orders && props.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.ordersRub,
        label: "Запросов на покупку",
        type: "line",
        fill: {
          target: "origin",
        },
        backgroundColor: colors.ordersBackground,
        borderColor: colors.orders,
        yAxisID: "y-axis-steam",
      });
    }

    if (props.orders && props.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.ordersRub,
        label: "Запросов на покупку",
        type: "line",
        fill: {
          target: "origin",
        },
        backgroundColor: colors.ordersBackground,
        borderColor: colors.orders,
        yAxisID: "y-axis-steam",
      });
    }

    if (props.lots && props.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.lotsRub,
        label: "Лотов на продажу",
        type: "line",
        fill: {
          target: "origin",
        },
        backgroundColor: colors.lotsBackground,
        borderColor: colors.lots,
        yAxisID: "y-axis-steam",
      });
    }

    if (props.lots && props.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.lotsUsd,
        label: "Лотов на продажу",
        type: "line",
        fill: {
          target: "origin",
        },
        backgroundColor: colors.lotsBackground,
        borderColor: colors.lots,
        yAxisID: "y-axis-steam",
      });
    }

    return newSeriesDeals;
  };

  updateUsersSeries = (props: any) => {
    let newSeriesUsers = [];

    if (props.players) {
      newSeriesUsers.push({
        data: this.state.itemData.gameConcurrentInGame,
        label: "Количество в игре",
        type: "line",
        borderColor: colors.gameConcurrentInGame,
        yAxisID: "y-axis-steamdb",
      });
    }

    if (props.steamOnline) {
      newSeriesUsers.push({
        data: this.state.itemData.steamConcurrentOnline,
        label: "Общий онлайн Steam",
        type: "line",
        borderColor: colors.steamConcurrentOnline,
        yAxisID: "y-axis-steamdb",
      });
    }

    if (props.twitchViewers) {
      newSeriesUsers.push({
        data: this.state.itemData.gameConcurrentTwitchViewers,
        label: "Количество зрителей в Twitch",
        type: "line",
        borderColor: colors.gameConcurrentTwitchViewers,
        yAxisID: "y-axis-steamdb",
      });
    }

    if (props.totalPlayers) {
      newSeriesUsers.push({
        data: this.state.itemData.steamConcurrentInGame,
        label: "Общее количество играющих",
        type: "line",
        borderColor: colors.steamConcurrentInGame,
        yAxisID: "y-axis-steamdb",
      });
    }

    return newSeriesUsers;
  };

  updateZoom = () => {
    if (!this.componentRef.current) {
      return
    }

    setTimeout(() => {
      // Does not work outside of setTimeout

      const[min, max] = getTimePeriod(
          this.props.formData.scale,
          this.state.itemData.startDate
      );
      // @ts-ignore
      this.componentRef.current.zoomScale('x', {min: min, max: max}, 'default');
      // @ts-ignore
      this.componentRef.current.update()

      document.getElementsByClassName("chart")[0].classList.remove("hide") // hack

    }, 0.000001)
  }

  async componentDidMount() {
    await this.fetchData();

    if (!this.props.isLogged) {
      return;
    }

    document.getElementsByClassName("chart")[0].classList.add("hide") // hack
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
    this.updateZoom();
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

      if (this.props.isLogged) {
        flag = true;
      }
    }

    if (flag) {
      document.getElementsByClassName("chart")[0].classList.add("hide") // hack
      this.setState({
        data: {
          labels: this.state.itemData.dates,
          datasets: [
            ...this.updateDealsSeries(this.props.formData),
            ...this.updateUsersSeries(this.props.formData),
          ],
        },
      });
      this.updateZoom();
    }
  }

  render() {
    return (
      <div className="chart">
        <Line ref={this.componentRef} options={this.state.options} data={this.state.data} />
      </div>
    );
  }
}

export default Chart;
