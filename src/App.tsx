import CoinPage from "@pages/CoinPage/CoinPage";
import CardsList from "@components/CardsList/CardsList";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CardsList vsCurrency="usd" perPage={10} />}
          />
          <Route path="/coin">
            <Route path=":id" element={<CoinPage vsCurrency="usd" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
