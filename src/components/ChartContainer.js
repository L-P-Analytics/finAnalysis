import React from "react";
import {
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyChart from "./ohlcChart";

function ChartContainer({ ticker, tickerInput, setTicker, setTickerInput }) {
  const intervalValues = [
    "1min",
    "5min",
    "15min",
    "30min",
    "45min",
    "1h",
    "2h",
    "4h",
    "1day",
    "1week",
    "1month",
  ];

  return (
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
                defaultValue="1day"
              >
                {intervalValues.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: "20px",
              height: "400px",
            }}
          >
            <MyChart ticker={ticker} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default ChartContainer;
