/** @jsx jsx */
import React from "react";
import { observer } from "mobx-react";
import { IPropsWithStoreRequired } from "../Store";
import ExpensesTableRow from "./ExpensesTableRow";
import { css, jsx } from "@emotion/core";
import {
  Table,
  SortableTitle,
  center,
  alignRight,
  euroWatermark,
  plnWatermark
} from "./Styled";

interface IProps extends IPropsWithStoreRequired {}

const ExpensesTable: React.FC<IProps> = observer(props => {
  const store = props.store;

  return (
    <Table
      css={css`
        min-width: 540px;
      `}
    >
      <thead>
        <tr>
          <th
            css={css`
              width: 100%;
            `}
          >
            <SortableTitle columnName="title">Title</SortableTitle>
          </th>
          <th css={alignRight}>
            <SortableTitle columnName="pln" align="left">
              Amount (PLN)
            </SortableTitle>
          </th>
          <th css={alignRight}>
            <SortableTitle columnName="eur" align="left">
              Amount (EUR)
            </SortableTitle>
          </th>
          <th css={center}>Options</th>
        </tr>
      </thead>
      <tbody>
        {store.sortedExpensesList.map(expense => (
          <ExpensesTableRow key={expense.id} expense={expense} />
        ))}
        <tr
          css={css`
            background-color: #f5f5f5;
          `}
        >
          <td css={alignRight}>
            <b>TOTAL</b>
          </td>
          <td css={[alignRight, plnWatermark]}>
            <b>{store.totalInPLN.toFixed(2)}</b>
          </td>
          <td css={[alignRight, euroWatermark]}>
            <b>{store.totalInEUR.toFixed(2)}</b>
          </td>
          <td />
        </tr>
      </tbody>
    </Table>
  );
});

export default ExpensesTable;
