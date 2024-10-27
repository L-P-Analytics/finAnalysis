import Chart from "react-apexcharts";
import { getTimeSeries, formatTimeSeries } from "../apiService";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

function MyChart({ ticker = "IBM" }) {
  const chartRef = useRef(null);
  const [series, setSeries] = useState([]);

  const theme = useTheme();

  const options = {
    chart: {
      type: "candlestick",
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
      pan: {
        enabled: true,
        mode: "x",
      },
      background: theme.palette.background.default,
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
      forceNiceScale: true,
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

  const handleWheelZoom = (event) => {
    const chart = chartRef.current.chart;
    if (event.deltaY < 0) {
      chart.zoomX(
        chart.w.globals.minX + chart.w.globals.gridWidth / 10,
        chart.w.globals.maxX - chart.w.globals.gridWidth / 10
      );
    } else {
      chart.resetSeries();
    }
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.el) {
      const chartElement = chartRef.current.el;
      chartElement.addEventListener("wheel", handleWheelZoom);

      return () => {
        chartElement.removeEventListener("wheel", handleWheelZoom);
      };
    }
  }, []);

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
    <Chart
      options={options}
      series={series}
      type="candlestick"
      height={350}
      ref={chartRef}
    />
  );
}

export default MyChart;
