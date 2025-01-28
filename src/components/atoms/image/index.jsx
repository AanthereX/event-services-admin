/** @format */

import React from "react";

const Image = ({
  src = "",
  alt = "",
  className = "",
  width,
  height,
  draggable = false,
  ...rest
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`select-none ${className}`}
      width={width}
      height={height}
      draggable={draggable}
      {...rest}
    />
  );
};

export default Image;
