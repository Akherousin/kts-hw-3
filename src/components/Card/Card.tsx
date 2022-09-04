import React from "react";
import styles from "./Card.module.scss";
import classNames from "classnames";
import { formatCurrentPrice, formatPriceChange } from "@utils/formatPrices";

export interface CardProps {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export const Card = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps): JSX.Element => {
  let currentPrice: number | null | string = null;
  let priceChange: number | null | string = null;
  let currency: string = "usd";
  if (Array.isArray(content)) {
    [currentPrice, priceChange, currency] = content;
  }

  if (typeof currentPrice === "number" && typeof priceChange === "number") {
    currentPrice = formatCurrentPrice(currency, currentPrice);
    priceChange = formatPriceChange(priceChange, 2);
  }

  const renderedGraph =
    Number(priceChange) < 0 ? (
      <svg
        width="52"
        height="28"
        viewBox="0 0 52 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 24.8448L6.60748 20.9655L13.6168 27L18.2897 4.15517L27.1682 19.2414L31.3738 13.6379V4.15517L37.9159 9.75862L42.1215 2L51 17.0862"
          stroke="#D90429"
        />
      </svg>
    ) : (
      <svg
        width="52"
        height="29"
        viewBox="0 0 52 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M51 2L48.1223 5.67647H46.6835L45.2446 2L43.446 8.98529L40.9281 6.04412L38.0504 3.10294L33.7338 13.3971L32.6547 7.14706L30.1367 27L24.741 5.67647V10.0882H22.9424L22.9424 15.2353L19.705 11.5588L18.6259 15.9706L16.1079 13.3971L10.3525 17.8088L7.47482 27L0.999998 17.8088"
          stroke="#21BF73"
        />
      </svg>
    );

  return (
    <article className={styles.card} onClick={onClick}>
      <header>
        <img src={image} alt={`logo`} className={styles.card_logo} />

        <h2 className={styles.card_title}>{title}</h2>
        <p className={styles.card_subtitle}>{subtitle}</p>
      </header>

      {renderedGraph}

      <footer>
        <p className={styles.card_price}>{currentPrice}</p>
        <p
          className={classNames({
            [styles.card_change]: true,
            [styles[`card_change-decrease`]]: Number(priceChange) < 0,
          })}
        >
          {priceChange}%
        </p>
      </footer>
    </article>
  );
};
