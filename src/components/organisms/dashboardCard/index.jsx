/** @format */

import { Fragment, memo } from "react";
import Paragraph from "../../atoms/paragraph";
import labels from "../../../locale";
import CountUp from "react-countup";
import Image from "../../atoms/image";
import { Icons } from "../../../assets/icons";
import { kFormatter } from "../../../utils";

const DashboardCard = ({
  uniqKey,
  title = "",
  bgColor,
  isProfit = null,
  value,
  count = 0,
  className = "",
  type = "dashboard",
}) => {
  const { ProfitIcon, LossIcon } = Icons;
  return (
    <div
      key={uniqKey}
      className={`${
        type == "stats"
          ? `${className} p-6 rounded-[16px] ${bgColor}`
          : `2xl:w-[235px] xl:w-[235px] lg:w-2/5 md:w-full w-full ${bgColor} xl:max-w-[235px] h-[120px] lg:h-[160px] max-h-[120px] lg:max-h-[160px] rounded-2xl px-6 flex flex-col items-center justify-center gap-y-0 md:gap-y-4`
      }  `}
    >
      <div className={"w-full"}>
        <Paragraph
          className={
            "font-outfit_medium capitalize text-fs_24 md:text-fs_15 lg:text-fs_18 leading-[20px]"
          }
        >
          {title}
        </Paragraph>
      </div>
      <div className={"w-full mt-6 flex flex-col items-center justify-center"}>
        <div className={"w-full flex flex-row items-center justify-between"}>
          <CountUp
            className={
              "lg:text-fs_32 md:text-fs_20 text-fs_24 font-outfit_medium leading-[36px] text-c_1C1C1C"
            }
            duration={2}
            preserveValue={false}
            start={0}
            end={count}
            formattingFn={(val) => kFormatter(val)}
          />
          {isProfit !== null && value !== null ? (
            <Paragraph
              className={
                "font-outfit_medium tracking-[-0.02em] flex items-center justify-center text-fs_18 md:text-fs_12 lg:text-fs_18 leading-[20px]"
              }
            >
              {`${value}`}
              <Image
                src={!!isProfit ? ProfitIcon : LossIcon}
                alt={!!isProfit ? "profiticon" : "lossicon"}
                className={"inline-block mx-2 select-none"}
                draggable={false}
              />
            </Paragraph>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardCard);
