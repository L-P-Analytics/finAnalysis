import requests

def get_trending_news(stock_ticker, api_key):
    url = f'https://newsapi.org/v2/everything?q={stock_ticker}&sortBy=popularity&apiKey={api_key}'
    response = requests.get(url)
    return response.json()

api_key = 'e7961386b2454843a4e2b24cf5388dff'
## Get the trending news for user_input stock ticker
news_data = get_trending_news('AAPL', api_key)

