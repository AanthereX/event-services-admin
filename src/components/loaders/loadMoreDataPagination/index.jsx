/** @format */

import { Fragment } from "react";
import Paragraph from "../../atoms/paragraph";
import { Oval } from "react-loader-spinner";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../atoms/button";

const LoadMoreData = ({
  loading = false,
  label = "Load More",
  labelClassName = "",
  width = 40,
  height = 40,
  color = "#66A5C4",
  secondaryColor = "#9291A5",
  strokeWidth = 3,
  btnClassName = "",
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <Fragment>
      <div className={"flex flex-col items-center justify-center gap-2 mb-6"}>
        {!!loading ? (
          <Oval
            wrapperClass={"flex justify-center items-center"}
            strokeWidth={strokeWidth}
            height={height}
            width={width}
            color={color}
            secondaryColor={secondaryColor}
          />
        ) : (
          <Button
            variant={"none"}
            size={"none"}
            onClick={onClick}
            disabled={disabled}
            className={`!w-[50px] !h-[50px] border-[3px] border-c_9291A5 !rounded-full ${btnClassName}`}
          >
            <AiOutlinePlus size={40} color={"#9291A5"} />
          </Button>
        )}

        <Paragraph
          className={`!font-outfit_regular !text-start md:!text-fs_10 !text-fs_10 text-c_9291A5 !leading-[10px] ${labelClassName} ${
            !!loading || !!disabled ? "!cursor-not-allowed" : "!cursor-default"
          }`}
        >
          {label}
        </Paragraph>
      </div>
    </Fragment>
  );
};

export default LoadMoreData;
