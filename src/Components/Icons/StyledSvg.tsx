import styled from "@emotion/styled";

export const SVG = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #000;
  margin-right: 4px;
  &:last-child {
    margin: 0;
  }
`;

export const SVGWithHover = styled(SVG)`
  fill: #909090;
  &:hover {
    fill: #d32f2f;
  }
`;
