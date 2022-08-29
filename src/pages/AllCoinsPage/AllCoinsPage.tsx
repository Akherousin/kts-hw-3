import CardsList from "@components/CardsList/CardsList";
import React from "react";
import "@styles/pages/AllCoinsPage/AllCoinsPage.scss";

function AllCoinsPage(): JSX.Element {
  return (
    <>
      <h1 className="main_heading">Coins</h1>
      <CardsList vsCurrency="usd" perPage={15} />
    </>
  );
}

export default AllCoinsPage;
