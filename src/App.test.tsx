import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import store from "./Store";

it("renders without crashing empty table", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={new store()}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing with some data", () => {
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

  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={expensesStore}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("properly conver pln amount to eur by conversion rate", () => {
  const expensesStore = new store();
  expensesStore.conversionRate = 2;

  expensesStore.add({
    title: "Test conversion",
    amount: 100
  });

  expect(expensesStore.expensesList[0].amountInEur).toEqual(200);
});