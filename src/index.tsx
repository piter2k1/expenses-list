import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./App";
import store from "./Store";
import "./reset.css";

const expensesStore = new store();

// Add some demo expenses
expensesStore.add({
  title: "New book about Rust",
  amount: 100
});
expensesStore.add({
  title: "Snacks for a football match",
  amount: 20
});
expensesStore.add({
  title: "Bus ticket",
  amount: 2.55
});
// Fetch actual euro conversion rate
expensesStore.fetchCurrentConversionRate();

ReactDOM.render(
  <Provider store={expensesStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
