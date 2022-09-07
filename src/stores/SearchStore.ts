import coingecko from "@utils/coingecko";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

export interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  currentPrice?: number;
  priceChange?: number;
  large?: string;
  market_cap_rank?: number | null;
}

class SearchStore {
  searchTerm = "";
  foundCoins: ICoins[] = [];
  isSearchOn = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadSearchResults(coinName: string): Promise<any> {
    try {
      const response = await coingecko.get(`/search`, {
        params: { query: coinName },
      });

      runInAction(() => {
        this.foundCoins = response.data.coins.map((coin: any) => coin);
      });
    } catch (e) {
      console.log(e);
    }
  }

  setSearchTerm(term: string): void {
    this.searchTerm = term;
  }

  setIsSearchOn(mode: boolean): void {
    this.isSearchOn = mode;
  }

  onChange(term: string): void {
    this.isSearchOn = false;
    this.searchTerm = term;
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    this.loadSearchResults(this.searchTerm).catch((e) => console.log(e));
    this.isSearchOn = true;
  }
}

const searchStore = new SearchStore();

export default searchStore;
