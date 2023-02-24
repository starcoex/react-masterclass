export async function fetchCoins() {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  return await response.json();
  // .then((data) => setCoins(data));
}
export async function fetchCoin(coinId: string) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}`
  );
  return await response.json();
}
export async function fetchTickers(coinId: string) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/${coinId}`
  );
  return await response.json();
}

export async function fetchChart(coinId: string) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  return await response.json();
}
