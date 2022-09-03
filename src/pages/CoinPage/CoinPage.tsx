import React, { useState } from "react";
import Coin from "@components/Coin";
import { Button, ButtonColor } from "@components/Button";
import styles from "./CoinPage.module.scss";
import { useParams } from "react-router-dom";

export interface CoinPageProps {
  vsCurrency: string;
}

export type Periods = "1h" | "24h" | "7d" | "30d" | "1y";

interface ButtonData {
  period: Periods;
  renderedPeriod: string;
}

const buttons: ButtonData[] = [
  { period: "1h", renderedPeriod: "1 H" },
  { period: "24h", renderedPeriod: "24 H" },
  { period: "7d", renderedPeriod: "1 W" },
  { period: "30d", renderedPeriod: "1 M" },
  { period: "1y", renderedPeriod: "1 Y" },
];

function CoinPage({ vsCurrency }: CoinPageProps): JSX.Element {
  const { id } = useParams();
  if (typeof id !== "string") return <></>;

  const [period, setPeriod] = useState<Periods>("1h");

  const handleButtonClick = (period: Periods): void => {
    setPeriod(period);
  };

  function getBtnColor(btn: string): ButtonColor {
    return period === btn ? ButtonColor.primary : ButtonColor.secondary;
  }

  const renderedButtons = buttons.map((button) => (
    <Button
      color={getBtnColor(button.period)}
      onClick={() => handleButtonClick(button.period)}
      key={button.period + "-btn"}
    >
      {button.renderedPeriod}
    </Button>
  ));

  return (
    <>
      <Coin id={id} currency={vsCurrency} period={period} />
      <section className={styles.buttons}>{renderedButtons}</section>
    </>
  );
}

export default CoinPage;
