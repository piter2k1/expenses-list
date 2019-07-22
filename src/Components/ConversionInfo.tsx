/** @jsx jsx */
import React, { PureComponent, FormEvent, MouseEvent } from "react";
import { inject, observer } from "mobx-react";
import { IPropsWithStore } from "../Store";
import AmountInput, { TInputValue } from "./Form/AmountInput";
import { EditIcon, SyncIcon } from "./Icons";
import Button from "./Form/Button";
import { css, jsx } from "@emotion/core";

const spin = css`
  @keyframes spin {
    100% {
      transform: rotate(-360deg);
    }
  }
  animation: spin 1s linear infinite;
`;

interface IProps extends IPropsWithStore {}

interface IState {
  rate: string;
  edit: boolean;
}
type TReadonlyState = Readonly<IState>;

@inject("store")
@observer
export default class ConversionInfo extends PureComponent<
  IProps,
  TReadonlyState
> {
  private readonly store = this.props.store;
  private readonly amountRef = React.createRef<AmountInput>();
  state: TReadonlyState = {
    rate: "" + (this.store && this.store.conversionRate) || "4.5",
    edit: false
  };

  handleOnClick = (event: MouseEvent) => {
    event.preventDefault();

    this.store &&
      this.store.fetchCurrentConversionRate().then(_ => {
        this.store &&
          this.setState({
            rate: "" + this.store.conversionRate
          });
      });
  };

  handleOnChange = (value: TInputValue) => {
    let rate: string = "" + value;
    this.setState({ rate });
  };

  initEditMode = (event: MouseEvent) => {
    event.preventDefault();
    this.setState(
      {
        edit: true
      },
      () => {
        if (this.amountRef.current) {
          this.amountRef.current.setSelection();
        }
      }
    );
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = parseFloat(this.state.rate);

    if (!isNaN(value) && this.store) {
      this.store.conversionRate = value;
      this.setState({
        rate: "" + value
      });
    }

    this.setState({
      edit: false
    });
  };

  render() {
    if (!this.store) return null;

    const ConversionText = this.state.edit ? (
      <form onSubmit={this.handleSubmit} css={css({ display: "inline-block" })}>
        <AmountInput
          value={this.state.rate}
          onChange={this.handleOnChange}
          ref={this.amountRef}
        />
        <input type="submit" value="OK" />
      </form>
    ) : (
      <>
        <span css={css({ paddingRight: "20px" })}>
          <b>{this.store.conversionRate}</b>
        </span>
        <Button onClick={this.initEditMode}>
          <EditIcon /> Edit
        </Button>
        <Button onClick={this.handleOnClick}>
          <SyncIcon css={this.store.state === "pending" && spin} /> Fetch
          current conversion rate
        </Button>
      </>
    );

    const eurRate = (1 / this.store.conversionRate).toFixed(3);

    return (
      <div>
        <div>
          1 EUR = <b>{eurRate}</b> PLN
        </div>
        <div>Conversion rate: {ConversionText}</div>
      </div>
    );
  }
}
