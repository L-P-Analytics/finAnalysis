import "./App.css";
import React, { useState, useEffect } from "react";
import MyChart from "./ohlcChart";
import {
  Container,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Import axios to make API requests
import axios from "axios";


function App() {
  const [ticker, setTicker] = useState("IBM");
  const [tickerInput, setTickerInput] = useState("IBM");
  // load articles and aggregate sentiment
  const [articles, setArticles] = useState([]);
  const [aggregateSentiment, setAggregateSentiment] = useState({ positive: 0, negative: 0 });


  useEffect(() => {
    console.log(ticker);

        // Fetch articles and sentiment data from FastAPI
        const fetchArticles = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/analyze/${ticker}`);
            setArticles(response.data.articles); // Set articles in state
            setAggregateSentiment(response.data.aggregate_sentiment); // Set aggregate sentiment in state
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchArticles();
  }, [ticker]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Stock Ticker"
                  variant="outlined"
                  onChange={(e) => setTickerInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTicker(tickerInput);
                    }
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setTicker(tickerInput)}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  defaultValue="IBM"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Time Frame"
                  variant="outlined"
                  fullWidth
                  defaultValue="1D"
                >
                  <MenuItem value="1m">1m</MenuItem>
                  <MenuItem value="1D">1D</MenuItem>
                  <MenuItem value="1M">1M</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <div
              style={{
                marginTop: "20px",
                height: "400px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <MyChart ticker={ticker} />
            </div>
          </div>
        </Grid>
      </Grid>

      {/*
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Article Title 1</Typography>
              <Typography variant="body2">Summary 1</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    */}

    {/* Display aggregate sentiment */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h6">Aggregate Sentiment</Typography>
          <Typography variant="body2">Positive: {aggregateSentiment.positive}</Typography>
          <Typography variant="body2">Negative: {aggregateSentiment.negative}</Typography>
        </Grid>
      </Grid>

      {/* Display the list of articles */}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{article.headline}</Typography>
                <Typography variant="body2">{article.summary}</Typography>
                <Typography variant="body2" style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Sentiment: {article.sentiment.label} (Score: {article.sentiment.score})
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

/*
<div className="App">
      <header className="App-header">
        <MyChart />
      </header>
    </div>
    */

export default App;
