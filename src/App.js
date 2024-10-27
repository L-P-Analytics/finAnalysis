import "./App.css";
import React, { useState, useEffect } from "react";
import {
  createTheme,
  Container,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import NewsPanel from "./components/NewsPanel";
import ChartContainer from "./components/ChartContainer";

// Import axios to make API requests
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111111",
    },
    text: {
      primary: "#EEEEEE",
    },
  },
});

function App() {
  const [ticker, setTicker] = useState("IBM");
  const [tickerInput, setTickerInput] = useState("IBM");
  // load articles and aggregate sentiment
  const [articles, setArticles] = useState([]);
  const [aggregateSentiment, setAggregateSentiment] = useState({
    positive: 0,
    negative: 0,
  });

  useEffect(() => {
    console.log(ticker);

    // Fetch articles and sentiment data from FastAPI
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/analyze/${ticker}`
        );
        setArticles(response.data.articles); // Set articles in state
        setAggregateSentiment(response.data.aggregate_sentiment); // Set aggregate sentiment in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, [ticker]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
        <ChartContainer
          ticker={ticker}
          setTicker={setTicker}
          tickerInput={tickerInput}
          setTickerInput={setTickerInput}
        />
        <NewsPanel
          articles={articles}
          aggregateSentiment={aggregateSentiment}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
