import requests

def get_trending_news(stock_ticker, api_key):
    url = f'https://newsapi.org/v2/everything?q={stock_ticker}&sortBy=popularity&apiKey={api_key}'
    response = requests.get(url)
    return response.json()

api_key = 'e7961386b2454843a4e2b24cf5388dff'
## Get the trending news for user_input stock ticker
news_data = get_trending_news('AAPL', api_key)

def extract_top_articles(news_data, top=5):
    articles = news_data['articles'][:top]
    return [{'headline': article['title'], 'summary': article['description'], 'url': article['url']} for article in articles]

top_articles = extract_top_articles(news_data)

from transformers import pipeline
sentiment_analyzer = pipeline('sentiment-analysis', framework='pt')

def perform_sentiment_analysis(articles):
    for article in articles:
        sentiment = sentiment_analyzer(article['headline'])[0]
        article['sentiment'] = sentiment
    return articles

analyzed_articles = perform_sentiment_analysis(top_articles)

def aggregate_sentiment(articles):
    sentiment_scores = {'positive': 0, 'negative': 0}
    
    for article in articles:
        sentiment = article['sentiment']
        if sentiment['label'] == 'POSITIVE':
            sentiment_scores['positive'] += sentiment['score']
        elif sentiment['label'] == 'NEGATIVE':
            sentiment_scores['negative'] += sentiment['score']
    
    # Normalize by the number of articles to get an average score
    sentiment_scores['positive'] /= len(articles)
    sentiment_scores['negative'] /= len(articles)
    
    return sentiment_scores

# Aggregate sentiment
overall_sentiment = aggregate_sentiment(analyzed_articles)

def display_results(articles, aggregate_sentiment):
    print("Top 5 Trending News:")
    for i, article in enumerate(articles):
        print(f"{i+1}. {article['headline']}")
        print(f"   Summary: {article['summary']}")
        print(f"   Sentiment: {article['sentiment']}\n")

    print("Aggregate Sentiment for the Stock:")
    print(f"Positive Sentiment Score: {aggregate_sentiment['positive']:.2f}")
    print(f"Negative Sentiment Score: {aggregate_sentiment['negative']:.2f}")

# Display results
display_results(analyzed_articles, overall_sentiment)