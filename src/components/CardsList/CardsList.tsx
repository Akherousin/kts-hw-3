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
    const savedSearchTerm = window.localStorage.getItem("COINS_APP_searchTerm");

    const savedIsSearchOn = window.localStorage.getItem("COINS_APP_isSearchOn");

    if (
      typeof savedIsSearchOn === "string" &&
      typeof savedSearchTerm === "string"
    ) {
      searchStore.setSearchTerm(JSON.parse(savedSearchTerm));
      searchStore.setIsSearchOn(JSON.parse(savedIsSearchOn));

      searchStore
        .loadSearchResults(JSON.parse(savedSearchTerm))
        .catch((e) => console.log(e));
    }

    const coins = window.localStorage.getItem("COINS_APP_coins");
    if (typeof coins === "string") {
      cardsListStore.setCoins(JSON.parse(coins));

      cardsListStore
        .fetchCardsList(vsCurrency, perPage)
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "COINS_APP_searchTerm",
      JSON.stringify(searchStore.searchTerm)
    );
    window.localStorage.setItem(
      "COINS_APP_isSearchOn",
      JSON.stringify(searchStore.isSearchOn)
    );
  }, [searchStore.searchTerm, searchStore.isSearchOn]);

  useEffect(() => {
    window.localStorage.setItem(
      "COINS_APP_coins",
      JSON.stringify(cardsListStore.coins)
    );
  }, [cardsListStore.currentPage]);

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
