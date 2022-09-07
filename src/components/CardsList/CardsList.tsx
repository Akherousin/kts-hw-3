import React, { useEffect } from "react";
import { Card } from "@components/Card";
import { Loader, LoaderSize } from "@components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./CardsList.module.scss";
import { useNavigate } from "react-router-dom";
import cardsListStore from "@stores/CardsListStore";
import searchStore from "@stores/SearchStore";

import { observer } from "mobx-react-lite";

export interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  currentPrice?: number;
  priceChange?: number;
  large?: string;
  market_cap_rank?: number | null;
  // vsCurrency: string;
}

export interface CardListProps {
  vsCurrency: string;
  // Number of coins per page
  perPage: number;
}

function CardsList({ vsCurrency, perPage }: CardListProps): JSX.Element {
  useEffect(() => {
    cardsListStore.fetchCardsList(vsCurrency, perPage).catch((e) => {
      console.log(e);
    });
  }, []);

  function fetchDataOnScroll(): void {
    if (searchStore.isSearchOn) return;

    cardsListStore.setNextPage();

    cardsListStore
      .fetchCardsOnScroll(vsCurrency, perPage)
      .catch((e) => console.log(e));
  }

  const navigate = useNavigate();
  const coins = searchStore.isSearchOn
    ? searchStore.foundCoins
    : cardsListStore.coins;

  return (
    <div>
      <InfiniteScroll
        dataLength={coins.length}
        hasMore={true}
        next={fetchDataOnScroll}
        className={styles.cards_list}
        loader={<Loader size={LoaderSize.m} />}
        scrollThreshold={0.7}
        style={{ overflow: "hidden" }}
      >
        {coins.map((coin: ICoins) => {
          return searchStore.isSearchOn ? (
            <Card
              key={`id-${coin.id}-search`}
              image={coin.large != null ? coin.large : ""}
              title={coin.name}
              subtitle={coin.symbol}
              content={[coin.market_cap_rank]}
              onClick={() => navigate(`/coin/${coin.id}`)}
            />
          ) : (
            <Card
              key={`id-${coin.id}`}
              image={coin.image != null ? coin.image : ""}
              title={coin.name}
              subtitle={coin.symbol}
              content={[coin.currentPrice, coin.priceChange, vsCurrency]}
              onClick={() => navigate(`/coin/${coin.id}`)}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default observer(CardsList);
