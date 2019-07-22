/** @jsx jsx */
import React from "react";
import ExpensesForm from "./ExpensesForm";
import ExpensesDetails from "./ExpensesDetails";
import ConversionInfo from "./ConversionInfo";
import { css, jsx } from "@emotion/core";
import { Elevation } from "./Styled";

const ExpensesList: React.FC = () => {
  return (
    <div
      css={css`
        padding: 16px;
        max-width: 860px;
        margin: 0 auto;
      `}
    >
      <h1>List of expenses</h1>
      <Elevation>
        <ConversionInfo />
      </Elevation>
      <Elevation>
        <ExpensesForm />
      </Elevation>
      <Elevation
        css={css`
          padding: 16px 0 0;
        `}
      >
        <ExpensesDetails />
      </Elevation>
    </div>
  );
};

export default ExpensesList;
