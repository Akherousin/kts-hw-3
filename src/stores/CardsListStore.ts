import { makeAutoObservable, runInAction } from "mobx";
import coingecko from "@utils/coingecko";

export interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange: number;
  vsCurrency: string;
}

class CardsListStore {
  coins: ICoins[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCardsList() {}
}

export default new CardsListStore();
