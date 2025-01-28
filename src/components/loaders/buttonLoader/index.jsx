/** @format */

import { Oval } from "react-loader-spinner";

const ButtonLoader = ({ width = 24, height = 24, color = "#FFF" }) => {
  return (
    <>
      <Oval
        wrapperClass={"flex justify-center items-center"}
        strokeWidth={5}
        height={height}
        width={width}
        color={color}
        secondaryColor={color}
      />
    </>
  );
};

export default ButtonLoader;
