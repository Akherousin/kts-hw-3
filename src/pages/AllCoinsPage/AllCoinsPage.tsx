import CardsList from "@components/CardsList";
import React from "react";
import { Input } from "@components/Input";
import styles from "./AllCoinsPage.module.scss";
import searchStore from "@stores/SearchStore";
import { observer } from "mobx-react-lite";
import { Button } from "@components/Button";

function AllCoinsPage(): JSX.Element {
  return (
    <>
      <h1 className={styles.main_heading}>Coins</h1>
      <form className={styles.form_search} onSubmit={searchStore.onSubmit}>
        <Input value={searchStore.searchTerm} onChange={searchStore.onChange} />{" "}
        <Button>Search</Button>
      </form>
      <CardsList vsCurrency="usd" perPage={15} />
    </>
  );
}

export default observer(AllCoinsPage);
