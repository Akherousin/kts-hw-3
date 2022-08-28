import "./Loader.css";
import React from "react";
import classNames from "classnames";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export interface LoaderProps {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
}

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className = "loader",
}: LoaderProps): JSX.Element => {
  return (
    <>
      {loading && (
        <div className={classNames(className, `loader_size-${size}`)}></div>
      )}
    </>
  );
};
