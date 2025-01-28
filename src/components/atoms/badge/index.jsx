import React from "react";
// import { Images } from "../../utils/images";

const index = ({
  title = "",
  icon = "",
  className = "",
  OnClickAction = () => {},
}) => {
  return (
    <div
      className={`px-[20px] sm:px-[20px] rounded-[8px] py-[10px] flex items-center gap-1 cursor-pointer text-xs ${className}`}
      onClick={OnClickAction}
    >
      <img src={icon} />
      <h5 className="font-outfit_medium text-xs">{title}</h5>
    </div>
  );
};

export default index;
