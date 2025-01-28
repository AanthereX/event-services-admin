/** @format */

import React from "react";

const AuthFlowLayout = ({
  children,
  className = "w-full bg-c_F9F9F9 grid place-content-center min-h-screen",
}) => {
  return <div className={`${className}`}>{children}</div>;
};

export default AuthFlowLayout;
