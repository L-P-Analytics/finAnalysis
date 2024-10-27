import axios from "axios";

const API_URL = "https://api.twelvedata.com";
const API_KEY = "d2925b3abf2d4b0f9874f67b9acd35b2";

export const getTimeSeries = async (ticker = "IBM") => {
  try {
    const requestURL = `${API_URL}/time_series?symbol=${ticker}&apikey=${API_KEY}&interval=1day&start_date=2020-01-06&end_date=2024-08-01`;

    const response = await axios.get(requestURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Formats the data into a graph readable format
 *
 * @param {Ojbect} data - the stock data received from alphavantage
 */
export const formatTimeSeries = (data) => {
  console.log(` My data ${data}`);
  window.myData = data;

  const keys = Object.keys(data);

  // The second key in the alphavantage data lists the stock data
  const key = keys[1];

  const formattedData = data[key].map((element) => ({
    x: element["datetime"],
    y: [element["open"], element["high"], element["low"], element["close"]],
  }));

  return formattedData;
};
