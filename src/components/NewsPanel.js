import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function NewsPanel({ articles, aggregateSentiment }) {
  return (
    <div>
      {/* Display aggregate sentiment */}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h6">Aggregate Sentiment</Typography>
          <Typography variant="body2">
            Positive: {aggregateSentiment.positive}
          </Typography>
          <Typography variant="body2">
            Negative: {aggregateSentiment.negative}
          </Typography>
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
                <Typography
                  variant="body2"
                  style={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Sentiment: {article.sentiment.label} (Score:{" "}
                  {article.sentiment.score})
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NewsPanel;
