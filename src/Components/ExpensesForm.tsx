/** @jsx jsx */
import React, { PureComponent, FormEvent } from "react";
import { inject } from "mobx-react";
import AmountInput from "./Form/AmountInput";
import { IPropsWithStore } from "../Store";
import Button from "./Form/Button";
import { DoneIcon } from "./Icons";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SuccessButton = styled(Button)`
  border-color: #c0ca33;
  background-color: #cddc39;
`;

const inputRow = css`
  display: flex;
  .left {
    width: 180px;
    min-width: 180px;
  }
  .right {
    flex-grow: 1;
  }
  label {
    line-height: 1.9rem;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const error = css`
  color: #e53935;
  font-size: 0.7rem;
  padding: 2px 0;
`;

interface IProps extends IPropsWithStore {}
interface IState {
  title: string;
  isTitleInvalid: boolean;
  isAmountInvalid: boolean;
  amount: string | number;
}
type TReadonlyState = Readonly<IState>;

const INITIAL_STATE: TReadonlyState = {
  title: "",
  isTitleInvalid: false,
  isAmountInvalid: false,
  amount: ""
};

@inject("store")
export default class ExpensesForm extends PureComponent<
  IProps,
  TReadonlyState
> {
  private readonly titleRef = React.createRef<HTMLInputElement>();
  private readonly amountRef = React.createRef<AmountInput>();
  state: TReadonlyState = INITIAL_STATE;

  componentDidMount() {
    this.focusTitle();
  }

  focusTitle(): void {
    const node = this.titleRef.current;
    if (node) {
      node.focus();
    }
  }

  getTitle(): string {
    // Beautify title by trim whitespaces and uppercase first letter.
    if (this.state.title) {
      let title = this.state.title.trim();
      return title[0].toUpperCase() + title.slice(1);
    }

    return "";
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let state: IState = {
      title: this.getTitle(),
      amount: this.state.amount,
      isAmountInvalid: false,
      isTitleInvalid: false
    };

    // Validate title
    if (state.title.length < 5) {
      state.isTitleInvalid = true;
    }

    const amountPattern = /^\d+(\.\d{1,2})?$/;
    if (!amountPattern.test("" + state.amount)) {
      state.isAmountInvalid = true;
    }

    if (state.isAmountInvalid || state.isTitleInvalid) {
      this.setState(state, () => {
        if (state.isTitleInvalid) {
          this.focusTitle();
        } else {
          if (this.amountRef.current) {
            this.amountRef.current.setSelection();
          }
        }
      });
      return;
    }

    const store = this.props.store;
    if (store) {
      store.add({
        title: state.title,
        amount: +state.amount
      });
    }

    this.setState(INITIAL_STATE, () => {
      this.focusTitle();
    });
  };

  titleHandler = (event: FormEvent<HTMLInputElement>) => {
    this.setState({
      title: event.currentTarget.value
    });
  };

  onAmountChange = (amount: number) => {
    this.setState({ amount });
  };

  render() {
    const isTitleInvalid = this.state.isTitleInvalid;
    const isAmountInvalid = this.state.isAmountInvalid;
    return (
      <form onSubmit={this.handleSubmit}>
        <div css={inputRow}>
          <div className="left">
            <label htmlFor="title">Title of transaction</label>
          </div>
          <div className="right">
            <input
              type="text"
              id="title"
              ref={this.titleRef}
              onChange={this.titleHandler}
              value={this.state.title}
              autoComplete="off"
              css={css({ width: "100%" })}
              className={isTitleInvalid ? "error" : ""}
            />
            {isTitleInvalid && (
              <p css={error}>Title should have at least 5 characters.</p>
            )}
          </div>
        </div>
        <div css={inputRow}>
          <div className="left">
            <label htmlFor="amount">Amount</label>
          </div>
          <div className="right">
            <AmountInput
              id="amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
              ref={this.amountRef}
            />{" "}
            PLN
            {isAmountInvalid && (
              <p css={error}>
                Amount should consist of digits and most two digits after the
                decimal point.
              </p>
            )}
          </div>
        </div>
        <div css={css({ textAlign: "right", paddingTop: "10px" })}>
          <SuccessButton>
            <DoneIcon /> Add
          </SuccessButton>
        </div>
      </form>
    );
  }
}
