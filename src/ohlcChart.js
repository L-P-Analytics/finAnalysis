import Chart from "react-apexcharts";
import { getTimeSeries, formatTimeSeries } from "./apiService";
import React, { useState, useEffect } from "react";

const options = {
  chart: {
    type: "candlestick",
    toolbar: { show: false },
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: true,
    },
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00B746",
        downward: "#EF403C",
      },
    },
  },
};

function MyChart({ ticker = "IBM" }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTimeSeries(ticker);
      setSeries([
        {
          name: "candle",
          data: formatTimeSeries(data),
        },
      ]);
    };

    fetchData();
  }, [ticker]);

  return (
    <Chart options={options} series={series} type="candlestick" height={350} />
  );
}

export default MyChart;
