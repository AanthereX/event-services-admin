/** @format */

import { InfinitySpin, Puff, ThreeCircles } from "react-loader-spinner";
import { Icons } from "../../../assets/icons";
import Image from "../../atoms/image";

const PageLoader = ({
  block = true,
  children,
  color = "#66A5C4",
  width = 160,
  height = 50,
}) => {
  const { logo } = Icons;
  if (block) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <div
      role={"status"}
      className={"bg-transparent min-h-screen flex items-center justify-center"}
    >
      <div
        className={
          "w-full min-h-screen inset-0 flex items-center flex-col gap-y-2 justify-center cursor-loading"
        }
      >
        <Image
          className={"w-24 h-24"}
          src={logo}
          alt={"logo"}
          width={24}
          height={24}
          draggable={false}
        />
        {children}
        {!!block ? (
          <ThreeCircles
            height={height}
            width={width}
            color={color}
            ariaLabel={"three-circles-loading"}
            wrapperStyle={{}}
            wrapperClass={""}
            visible={true}
          />
        ) : null}

        <span className={"sr-only"}>Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;
