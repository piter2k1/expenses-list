import React from "react";
import { inject, observer } from "mobx-react";
import { IPropsWithStore } from "../Store";
import ExpensesTable from "./ExpensesTable";
import styled from "@emotion/styled";

const NoItemsDiv = styled.div`
  padding: 0 16px 16px;
  color: #558b2f;
  text-align: center;
`;

interface IProps extends IPropsWithStore {}

@inject("store")
@observer
export default class ExpensesDetails extends React.PureComponent<IProps> {
  private readonly store = this.props.store;

  render() {
    return (
      (this.store && this.store.expensesList.length && (
        <ExpensesTable store={this.store} />
      )) || <NoItemsDiv>Add some items to show table.</NoItemsDiv>
    );
  }
}
