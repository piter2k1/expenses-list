import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const Table = styled.table`
  width: 100%;
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  thead th {
    color: #9E9E9E;
    font-size: 0.76rem;
    font-weight: bold;
    white-space: nowrap;
    user-select: none;
  }
  th,
  td {
    font-weight: normal;
    display: table-cell;
    padding: 14px 20px 14px 16px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    &:last-child {
      padding-right: 16px;
    }
  }
`;

export const alignRight = css`
  text-align: right;
`;

export const center = css`
  text-align: center;
`;

export const euroWatermark = css`
  white-space: nowrap;
  position: relative;
  padding-right: 46px !important;
  &:before {
    width: 36px;
    height: 20px;
    display: block;
    content: "€";
    color: #bdbdbd;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -10px;
    text-align: left;
  }
`;

export const plnWatermark = css(
  euroWatermark,
  `
    &:before {
      content: "PLN";
    }
  `
);
