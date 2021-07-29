/* eslint-disable @typescript-eslint/no-unused-vars */
import ApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { CryptoXor } from "crypto-xor";

import { FormValues, ChartState, ItemData, Series } from "../types";
import { fetchWithErrorCheck } from "../utils";

class Chart extends React.Component<FormValues, ChartState> {
  state: ChartState = {
    itemData: {},

    seriesDeals: [],
    seriesUsers: [],

    optionsDeals: {
      xaxis: {
        type: "datetime",
        min: undefined,
      },

      yaxis: [
        {
          decimalsInFloat: 2,
          seriesName:
            this.props.formData.currecy === "rub" ? "Цена ₽" : "Цена $",
        },
        { decimalsInFloat: 0, opposite: true },
      ],

      chart: {
        animations: {
          enabled: false,
        },
        stacked: false,
        height: 200,
      },

      theme: {
        mode: "light",
        palette: "palette8",
      },

      fill: {
        type: ["solid", "gradient", "gradient", "gradient"],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.5,
          stops: [0, 70, 100],
        },
      },

      stroke: {
        curve: "straight",
        width: 2,
      },

      markers: {
        size: 0,
      },

      dataLabels: {
        enabled: false,
      },
    },

    optionsUsers: {
      xaxis: {
        type: "datetime",
      },

      yaxis: [
        {
          title: {
            text: "Пользователи, чел.",
          },
        },
      ],

      chart: {
        animations: {
          enabled: false,
        },
        height: 600,
      },

      stroke: {
        curve: "straight",
        width: 1,
      },

      markers: {
        size: 0,
      },

      dataLabels: {
        enabled: false,
      },
    },
  };

  fetchData = async () => {
    const response = await fetchWithErrorCheck(
      `/api/chart/${this.props.id}`,
      this.props.setIsLogged,
      false,
      true
    );

    if (response === 1) return <Redirect push to="/login" />;

    let data = await response.json();

    data = CryptoXor.decrypt(data.data, "testPass");
    data = JSON.parse(data);

    const startDate = data.startDate;

    if (startDate) {
      this.setState({
        optionsDeals: {
          xaxis: {
            type: "datetime",
            min: startDate,
          },
        },
      });
    }

    const priceRub = data.map((item: ItemData) => [item.date, item.priceRub]);
    const priceUsd = data.map((item: ItemData) => [item.date, item.priceUsd]);
    const dealsQty = data.map((item: ItemData) => [item.date, item.dealsQty]);
    const ordersRub = data.map((item: ItemData) => [item.date, item.ordersRub]);
    const ordersUsd = data.map((item: ItemData) => [item.date, item.ordersUsd]);
    const lotsRub = data.map((item: ItemData) => [item.date, item.lotsRub]);
    const lotsUsd = data.map((item: ItemData) => [item.date, item.lotsUsd]);
    const gameConcurrentInGame = data.map((item: ItemData) => [
      item.date,
      item.gameConcurrentInGame,
    ]);
    const steamConcurrentOnline = data.map((item: ItemData) => [
      item.date,
      item.steamConcurrentOnline,
    ]);
    const gameConcurrentTwitchViewers = data.map((item: ItemData) => [
      item.date,
      item.gameConcurrentTwitchViewers,
    ]);
    const steamConcurrentInGame = data.map((item: ItemData) => [
      item.date,
      item.steamConcurrentInGame,
    ]);

    this.setState({
      itemData: {
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
      },
    });
  };

  updateDealsSeries = () => {
    let newSeriesDeals: Series[] = [];
    let newSeriesUsers: Series[] = [];

    if (this.props.formData.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.priceRub,
        name: "Цена ₽",
        type: "line",
      });
    }

    if (this.props.formData.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.priceUsd,
        name: "Цена $",
        type: "line",
      });
    }

    if (this.props.formData.deals) {
      newSeriesDeals.push({
        data: this.state.itemData.dealsQty,
        name: "Количество сделок",
        type: "area",
      });
    }

    if (this.props.formData.orders && this.props.formData.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.ordersRub,
        name: "Запросы на покупку",
        type: "area",
      });
    }

    if (this.props.formData.orders && this.props.formData.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.ordersRub,
        name: "Запросы на покупку",
        type: "area",
      });
    }

    if (this.props.formData.lots && this.props.formData.currency === "rub") {
      newSeriesDeals.push({
        data: this.state.itemData.lotsRub,
        name: "Лотов в продаже",
        type: "area",
      });
    }

    if (this.props.formData.lots && this.props.formData.currency === "usd") {
      newSeriesDeals.push({
        data: this.state.itemData.lotsUsd,
        name: "Лотов в продаже",
        type: "area",
      });
    }

    this.setState({
      seriesDeals: newSeriesDeals,
    });
  };

  updateUsersSerier = () => {
    let newSeriesUsers: Series[] = [];

    if (this.props.formData.online === "gameConcurrentInGame") {
      newSeriesUsers.push({
        data: this.state.itemData.gameConcurrentInGame,
        name: "Количество в игре",
        type: "area",
      });
    }

    if (this.props.formData.online === "steamConcurrentOnline") {
      newSeriesUsers.push({
        data: this.state.itemData.steamConcurrentOnline,
        name: "Общий онлайн Steam",
        type: "area",
      });
    }

    if (this.props.formData.online === "gameConcurrentTwitchViewers") {
      newSeriesUsers.push({
        data: this.state.itemData.gameConcurrentTwitchViewers,
        name: "Количество зрителей в Twitch",
        type: "area",
      });
    }

    if (this.props.formData.online === "steamConcurrentInGame") {
      newSeriesUsers.push({
        data: this.state.itemData.steamConcurrentInGame,
        name: "Общее количество играющих",
        type: "area",
      });
    }

    this.setState({
      seriesUsers: newSeriesUsers,
    });
  };

  async componentDidMount() {
    await this.fetchData();

    if (this.props.isLogged) {
      this.updateDealsSeries();
      this.updateUsersSerier();
    }
  }

  async componentDidUpdate(prevProps: { formData: FormValues; id: number }) {
    if (
      JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)
    ) {
      this.updateDealsSeries();
      this.updateUsersSerier();
    }

    if (prevProps.id !== this.props.id) {
      await this.fetchData();
      this.updateDealsSeries();
      this.updateUsersSerier();
    }
  }

  render() {
    return (
      <div>
        <ApexChart
          options={this.state.optionsDeals}
          series={this.state.seriesDeals}
        />

        {this.props.formData.online === "none" ? null : (
          <ApexChart
            options={this.state.optionsUsers}
            series={this.state.seriesUsers}
          />
        )}
      </div>
    );
  }
}

export default Chart;
