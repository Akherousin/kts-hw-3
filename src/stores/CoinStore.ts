import { makeAutoObservable, runInAction } from "mobx";
import coingecko from "@utils/coingecko";

export interface CoinData {
  name: string;
  symbol: string;
  imgSmall: string;
  curPrice: number;
  priceChange1hPercent: number;
  priceChange24hPercent: number;
  priceChange7dPercent: number;
  priceChange30dPercent: number;
  priceChange1yPercent: number;
}

class CoinStore {
  loading: boolean = true;
  name = "";
  symbol: string = "";
  imgSmall = "";
  curPrice = 0;

  priceChange1hPercent = 0;
  priceChange24hPercent = 0;
  priceChange7dPercent = 0;
  priceChange30dPercent = 0;
  priceChange1yPercent = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCoinData(id: string, currency: string): Promise<any> {
    try {
      const request = await coingecko.get(`/coins/${id}`, {
        params: { tickers: false },
      });

      const coinData = request.data;
      const prices = coinData.market_data;

      runInAction(() => {
        this.loading = false;
        this.name = coinData.name;
        this.symbol = coinData.symbol;
        this.imgSmall = coinData.image.small;
        this.curPrice = prices.current_price[currency];
        this.priceChange1hPercent =
          prices.price_change_percentage_1h_in_currency[currency];
        this.priceChange24hPercent =
          prices.price_change_percentage_24h_in_currency[currency];
        this.priceChange7dPercent =
          prices.price_change_percentage_7d_in_currency[currency];
        this.priceChange30dPercent =
          prices.price_change_percentage_30d_in_currency[currency];
        this.priceChange1yPercent =
          prices.price_change_percentage_1y_in_currency[currency];
      });
    } catch (e) {
      runInAction(() => console.log(e));
    }
  }

  getPriceChangePercent = (period: string): string => {
    return String(this[`priceChange${period}Percent` as keyof CoinStore]);
  };

  getPriceChange(period: string): string {
    return String(
      (100 * this.curPrice) /
        (100 - Number(this.getPriceChangePercent(period))) -
        this.curPrice
    );
  }
}

export default new CoinStore();
