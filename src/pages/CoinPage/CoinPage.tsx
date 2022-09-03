import React, { useState } from "react";
import Coin from "@components/Coin/Coin";
import { Button, ButtonColor } from "@components/Button/Button";
import styles from "./CoinPage.module.scss";
import { useParams } from "react-router-dom";

export interface CoinPageProps {
  vsCurrency: string;
}

function CoinPage({ vsCurrency }: CoinPageProps): JSX.Element {
  const { id } = useParams();
  if (typeof id !== "string") return <></>;

  const [period, setPeriod] = useState("1h");

  const handleButtonClick = (period: string): void => {
    setPeriod(period);
  };

  function getBtnColor(btn: string): ButtonColor {
    return period === btn ? ButtonColor.primary : ButtonColor.secondary;
  }

  return (
    <>
      <Coin id={id} currency={vsCurrency} period={period} />
      <section className={styles.buttons}>
        <Button
          color={getBtnColor("1h")}
          onClick={() => handleButtonClick("1h")}
        >
          1 H
        </Button>
        <Button
          color={getBtnColor("24h")}
          onClick={() => handleButtonClick("24h")}
        >
          24 H
        </Button>
        <Button
          color={getBtnColor("7d")}
          onClick={() => handleButtonClick("7d")}
        >
          1 W
        </Button>
        <Button
          color={getBtnColor("30d")}
          onClick={() => handleButtonClick("30d")}
        >
          1 M
        </Button>
        <Button
          color={getBtnColor("1y")}
          onClick={() => handleButtonClick("1y")}
        >
          1 Y
        </Button>
      </section>
    </>
  );
}

export default CoinPage;
