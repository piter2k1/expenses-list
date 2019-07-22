/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import arrow from "./../../Icons/Arrow.svg";
import { TColNames, IPropsWithStore } from "./../../Store";
import { inject, observer } from "mobx-react";

const sortableTitle = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-direction: inherit;
  justify-content: flex-start;
  vertical-align: middle;
  &.sortDesc,
  &.sortAsc {
    font-weight: bold;
    color: #000;
    & img {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
  &.sortDesc img {
    transform: rotate(180deg);
  }
  &.sortDesc img,
  &.sortAsc img,
  &:hover {
    color: #000;
    img {
      opacity: 1;
    }
  }
  img {
    display: inline-block;
    width: 18px;
    height: 18px;
    opacity: 0;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin-left: 4px;
    margin-right: 4px;
    user-select: none;
  }
`;

interface IProps extends IPropsWithStore, React.HTMLAttributes<HTMLDivElement> {
  columnName: TColNames;
  align?: "left" | "right";
}
export const SortableTitle: React.FC<IProps> = inject("store")(
  observer(({ columnName, children, align = "right", ...props }) => {
    const getSortClass = () => {
      if (props.store && columnName === props.store.sortBy) {
        return props.store.sortType === "asc" ? "sortAsc" : "sortDesc";
      }
    };

    const handleOnClick = () => {
      if (props.store) {
        const store = props.store;
        if(store.sortBy === columnName) {
          store.sortType = store.sortType === 'asc' ? 'desc' : 'asc';
        } else {
          store.sortBy = columnName;
          store.sortType = 'asc';
        }
      }
    };

    const Arrow = <img src={arrow} alt="toggle" />;
    return (
      <span
        className={getSortClass()}
        onClick={handleOnClick}
        css={sortableTitle}
        {...props}
        title="Sort by this column"
      >
        {align === "left" && Arrow}
        {children}
        {align === "right" && Arrow}
      </span>
    );
  })
);
