/** @format */

import Paragraph from "../../atoms/paragraph";
import Button from "../../atoms/button";
import labels from "../../../locale";
import moment from "moment";
import { Fragment } from "react";

const ButtonBadgeList = ({
  data = [],
  title = "",
  titleStyle = "",
  btnClassName = "",
  badgesContainerClassName = "",
}) => {
  return (
    <div>
      <Paragraph
        className={`font-outfit_medium text-fs_18 md:text-fs_18 !leading-[16px] ${titleStyle}`}
      >
        {title}
      </Paragraph>
      {!!data?.length ? (
        <div
          className={`flex items-center gap-3 flex-wrap ${badgesContainerClassName}`}
        >
          {typeof data === "object" ? (
            data?.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <Button
                    label={item?.label}
                    btnTextClassName={"!text-primary"}
                    className={`flex justify-center !w-auto text-c_5669FF leading-[20px] items-center rounded-[4px] !bg-c_66A5C41F !py-2 !px-[10px] ${btnClassName}`}
                  />
                </Fragment>
              );
            })
          ) : (
            <Button
              label={moment(data).format("DD-MM-YYYY")}
              btnTextClassName={"!text-primary"}
              className={`flex justify-center !w-auto text-c_5669FF leading-[20px] items-center rounded-[4px] !bg-c_66A5C41F !py-2 !px-[10px] ${btnClassName}`}
            />
          )}
        </div>
      ) : (
        <div
          className={`flex items-center flex-wrap !text-c_181818 !leading-0 font-outfit_regular text-fs_18 md:text-fs_18`}
        >
          {labels.notAvailable}
        </div>
      )}
    </div>
  );
};

export default ButtonBadgeList;
