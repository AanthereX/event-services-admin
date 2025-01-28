/** @format */

import { useState } from "react";
import HideEyeIcon from "../../../assets/icons/HideEyeIcon";
import ShowEyeIcon from "../../../assets/icons/ShowEyeIcon";
import Input from "../../atoms/input";

const PasswordInput = ({
  onKeyDown = () => {},
  containerClassName = "",
  ...rest
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const handleClickEyeIcon = () => setIsHidden((prev) => !prev);
  return (
    <div className={`w-full !relative ${containerClassName}`}>
      <div className={"w-full"}>
        <Input
          onKeyDown={onKeyDown}
          type={!!isHidden ? "password" : "text"}
          {...rest}
        />

        <div
          onClick={handleClickEyeIcon}
          className={`cursor-pointer w-fit h-fit !z-[99] absolute ${
            !!isHidden ? "top-[52px]" : "top-[53px]"
          } right-4`}
        >
          {!!isHidden ? (
            <HideEyeIcon color={"#252525"} />
          ) : (
            <ShowEyeIcon color={"#252525"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
