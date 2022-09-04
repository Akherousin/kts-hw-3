import React, { useEffect } from "react";
import styles from "./Coin.module.scss";
import { formatCurrentPrice, formatPriceChange } from "@utils/formatPrices";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Loader } from "@components/Loader";
import coinStore from "@stores/CoinStore";
import { observer } from "mobx-react-lite";

export interface CoinProps {
  id: string;
  currency: string;
  period: string;
}

function Coin({ id, currency, period }: CoinProps): JSX.Element {
  useEffect(() => {
    coinStore.fetchCoinData(id, currency).catch((err) => console.error(err));
  }, []);

  const { name, symbol, imgSmall, curPrice, loading } = coinStore;

  const priceChangePercent = coinStore.getPriceChangePercent(period);
  const priceChange = coinStore.getPriceChange(period);

  const navigate = useNavigate();

  return loading ? (
    <Loader />
  ) : (
    <article className={styles.coin}>
      <header className={styles.coin_header}>
        <button
          type="button"
          className={styles["btn-return"]}
          onClick={() => navigate("/")}
        >
          <svg
            viewBox="0 0 10 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.33333 1.25731L7.92976 0L0 7.10345L7.92976 14.2069L9.33333 12.9496L2.80714 7.10345L9.33333 1.25731Z"
              fill="#212529"
            />
          </svg>
        </button>
        <img className={styles.coin_logo} src={imgSmall} />
        <h1 className={styles.coin_name}>{name}</h1>
        <p className={styles.coin_subtitle}>{`(${symbol})`}</p>

        <button type="button" className={styles["btn-star"]}>
          <svg
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.41143 2.2934L9.98857 5.12463L10.2514 5.63202L10.8229 5.70813L14.3429 6.1597L11.84 8.34148L11.4114 8.71187L11.5143 9.21926L12.1143 12.3296L8.96571 10.8632L8.41143 10.6552L7.88 10.9038L4.73143 12.3499L5.30286 9.23956L5.40571 8.73217L4.98286 8.34148L2.45714 6.13434L5.97714 5.68276L6.54857 5.60665L6.81143 5.09926L8.41143 2.2934ZM8.41143 0L5.81143 4.67813L0 5.42399L4.20571 9.06705L3.21143 14.2069L8.41143 11.7816L13.6114 14.2069L12.6171 9.06705L16.8229 5.42906L11.0114 4.67813L8.41143 0Z"
              fill="#343A40"
            />
          </svg>
        </button>
      </header>

      <main className={styles.coin_main}>
        <p className={styles.coin_price}>
          {formatCurrentPrice(currency, curPrice)}
        </p>
        <p
          className={classNames({
            [styles.coin_pricechange]: true,
            [styles[`coin_pricechange-decrease`]]: Number(priceChange) < 0,
          })}
        >
          {formatPriceChange(priceChange, 3)}
          {` (${formatPriceChange(priceChangePercent, 2)}%)`}
        </p>
        <div className={styles.graph_placeholder}></div>
      </main>
    </article>
  );
}

export default observer(Coin);
