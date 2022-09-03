import styles from "./Loader.module.scss";
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
        <div
          className={classNames(
            styles[className],
            styles[`loader_size-${size}`]
          )}
        ></div>
      )}
    </>
  );
};
