/** @jsx jsx */
import React from "react";
import { Expense } from "../Store";
import { observer } from "mobx-react";
import { css, jsx } from "@emotion/core";
import { center, alignRight, euroWatermark, plnWatermark } from "./Styled";
import { DeleteIcon } from "./Icons";

interface IProps {
  expense: Expense;
}

const ExpensesTableRow: React.FC<IProps> = observer(props => {
  const { title, amount, amountInEur } = props.expense;

  const handleDelete = () => {
    props.expense.destroy();
  };

  return (
    <tr>
      <th>{title}</th>
      <td css={[alignRight, plnWatermark]}>{amount.toFixed(2)}</td>
      <td css={[alignRight, euroWatermark]}>{amountInEur.toFixed(2)}</td>
      <td css={css(center, {whiteSpace: "nowrap"})}>
        <DeleteIcon onClick={handleDelete} />
      </td>
    </tr>
  );
});

export default ExpensesTableRow;
