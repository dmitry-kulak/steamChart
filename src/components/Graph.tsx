/* eslint-disable @typescript-eslint/no-unused-vars */
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

import { FormValues, GraphState, ItemData, Series } from "../types";
import { isThrowStatement } from "typescript";
import { throws } from "assert";

class Graph extends React.Component<FormValues, GraphState> {
  state: GraphState = {
    itemData: {},

    series: [],

    options: {
      xaxis: {
        type: "datetime",
      },

      yaxis: [{ decimalsInFloat: 3 }],

      chart: {
        animations: {
          enabled: false,
          dynamicAnimation: {
            enabled: false,
          },
        },
      },

      markers: {
        size: 0,
      },

      dataLabels: {
        enabled: false
      }
      
    },
  };

  async componentDidMount() {
    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: this.props.id }),
    };

    const response = await fetch(
      "http://94.19.34.183:4567/api/graph",
      requestParams
    );

    let data = await response.json();
    console.log(data);
    data = data.data;

    const priceRub = data.map((item: ItemData) => [item.date, item.priceRub]);
    const priceUsd = data.map((item: ItemData) => [item.date, item.priceUsd]);
    const dealsQty = data.map((item: ItemData) => [item.date, item.dealsQty]);
    const buyQtyRub = data.map((item: ItemData) => [item.date, item.buyQtyRub]);
    const buyQtyUsd = data.map((item: ItemData) => [item.date, item.buyQtyUsd]);
    const sellQtyRub = data.map((item: ItemData) => [
      item.date,
      item.sellQtyRub,
    ]);
    const sellQtyUsd = data.map((item: ItemData) => [
      item.date,
      item.sellQtyUsd,
    ]);
    const gameConcurrentInGame = data.map((item: ItemData) => [
      item.date,
      item.gameConcurrentInGame,
    ]);
    const steamConcurrentOnline = data.map((item: ItemData) => [
      item.date,
      item.steamConcurrentOnline,
    ]);
    const twitchConcurrentViewers = data.map((item: ItemData) => [
      item.date,
      item.twitchConcurrentViewers,
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
        buyQtyRub: buyQtyRub,
        buyQtyUsd: buyQtyUsd,
        sellQtyRub: sellQtyRub,
        sellQtyUsd: sellQtyUsd,
        gameConcurrentInGame: gameConcurrentInGame,
        steamConcurrentOnline: steamConcurrentOnline,
        twitchConcurrentViewers: twitchConcurrentViewers,
        steamConcurrentInGame: steamConcurrentInGame,
      },
    });

    let newSeries: Series[] = [];

    if (this.props.formData.currency === "rub") {
      newSeries.push({
        data: this.state.itemData.priceRub,
        name: "Цена ₽",
        type: "line",
      });
    }

    if (this.props.formData.currency === "usd") {
      newSeries.push({
        data: this.state.itemData.priceUsd,
        name: "Цена $",
        type: "line",
      });
    }

    if (this.props.formData.deals) {
      newSeries.push({
        data: this.state.itemData.dealsQty,
        name: "Количество сделок",
        type: "column",
      });
    }

    if (this.props.formData.orders && this.props.currency === "rub") {
      newSeries.push({
        data: this.state.itemData.buyQtyRub,
        name: "Запросы на покупку",
        type: "column",
      });
    }

    if (this.props.formData.orders && this.props.currency === "usd") {
      newSeries.push({
        data: this.state.itemData.buyQtyUsd,
        name: "Запросы на покупку",
        type: "column",
      });
    }

    if (this.props.formData.lots && this.props.currency === "rub") {
      newSeries.push({
        data: this.state.itemData.sellQtyRub,
        name: "Лотов в продаже",
        type: "column",
      });
    }

    if (this.props.formData.lots && this.props.currency === "usd") {
      newSeries.push({
        data: this.state.itemData.sellQtyUsd,
        name: "Лотов в продаже",
        type: "column",
      });
    }

    if (this.props.formData.online === "gameConcurrentInGame") {
      newSeries.push({
        data: this.state.itemData.gameConcurrentInGame,
        name: "Количество в игре",
        type: "area",
      });
    }

    if (this.props.formData.online === "steamConcurrentOnline") {
      newSeries.push({
        data: this.state.itemData.steamConcurrentOnline,
        name: "Общий онлайн Steam",
        type: "area",
      });
    }

    if (this.props.formData.online === "twitchConcurrentViewers") {
      newSeries.push({
        data: this.state.itemData.twitchConcurrentViewers,
        name: "Количество зрителей в Twitch",
        type: "area",
      });
    }

    if (this.props.formData.online === "steamConcurrentInGame") {
      newSeries.push({
        data: this.state.itemData.steamConcurrentInGame,
        name: "Общее количество играющих",
        type: "area",
      });
    }

    console.log("newSeries: ", newSeries);

    this.setState({ series: newSeries });
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.series} />
      </div>
    );
  }
}

export default Graph;
