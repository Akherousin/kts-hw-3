import { makeAutoObservable, runInAction } from "mobx";
import coingecko from "@utils/coingecko";

export interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange: number;
}

class CardsListStore {
  coins: ICoins[] = [];
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCardsList(vsCurrency: string, perPage: number): Promise<any> {
    try {
      const request = await coingecko.get("/coins/markets", {
        params: {
          per_page: perPage,
          vs_currency: vsCurrency,
        },
      });

      runInAction(() => {
        this.coins = request.data.map(
          (raw: any): ICoins => ({
            id: raw.id,
            symbol: raw.symbol,
            name: raw.name,
            image: raw.image,
            currentPrice: raw.current_price,
            priceChange: raw.price_change_percentage_24h,
          })
        );
      });
    } catch (e) {
      runInAction(() => console.log(e));
    }
  }

  async fetchCardsOnScroll(vsCurrency: string, perPage: number): Promise<any> {
    try {
      const response = await coingecko.get("/coins/markets", {
        params: {
          per_page: perPage,
          page: this.currentPage,
          vs_currency: vsCurrency,
        },
      });

      const coinsData = response.data.map(
        (raw: any): ICoins => ({
          id: raw.id,
          symbol: raw.symbol,
          name: raw.name,
          image: raw.image,
          currentPrice: raw.current_price,
          priceChange: raw.price_change_percentage_24h,
        })
      );

      runInAction(() => {
        this.coins = this.coins.concat(coinsData);
      });
    } catch (e) {
      runInAction(() => console.log(e));
    }
  }

  setNextPage(): void {
    this.currentPage++;
  }
}

export default new CardsListStore();
