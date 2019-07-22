import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  border: solid 1px #EEEEEE;
  padding: 2px 12px 2px 8px;
  background-color: #f5f5f5;
  vertical-align: middle;
  border-radius: 4px;
  font-size: 1.1rem;
  margin: 0 4px 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12);

  & > svg {
    vertical-align: top;
  }
`;

interface IProps extends React.HTMLAttributes<HTMLElement> {}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
