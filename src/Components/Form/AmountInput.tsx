import React, { CSSProperties, FormEvent } from "react";

export type TInputValue = number | string;
interface IProps {
  value: TInputValue;
  onChange(value: TInputValue): void;
  id?: string | undefined;
}

const style: CSSProperties = {
  textAlign: "right"
};

export default class AmountInput extends React.PureComponent<IProps> {
  private readonly inputRef = React.createRef<HTMLInputElement>();

  triggerOnChanged = (value: TInputValue) => {
    this.props.onChange && this.props.onChange(value);
  };

  setSelection = () => {
    const node = this.inputRef.current;
    if (node) {
      node.focus();
      node.setSelectionRange(0, node.value.length);
    }
  };

  onChange = (event: FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    const pattern = /^[.,\d]+$/;

    if (pattern.test(value)) {
      // Convert `,` to `.` and `...` to `.`
      value = value.replace(",", ".").replace(/\.+/g, ".");

      this.triggerOnChanged(value);
    } else if (value === "") {
      this.triggerOnChanged("0");
    }
  };

  render() {
    return (
      <input
        type="text"
        placeholder="0.00"
        style={style}
        ref={this.inputRef}
        onChange={this.onChange}
        onClick={this.setSelection}
        value={this.props.value}
        id={this.props.id}
        autoComplete="off"
      />
    );
  }
}
