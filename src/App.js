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

function App() {
  const [ticker, setTicker] = useState("IBM");
  const [tickerInput, setTickerInput] = useState("IBM");

  useEffect(() => {
    console.log(ticker);
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
