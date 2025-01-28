/** @format */

import { Fragment } from "react";
import Image from "../../atoms/image";
import { Icons } from "../../../assets/icons";
import Paragraph from "../../atoms/paragraph";
import Heading from "../../atoms/heading";
import Button from "../../atoms/button";

const DeleteDialogActionForm = ({
  actions = [],
  title = "",
  description = "",
}) => {
  const { deleteIconRed } = Icons;
  return (
    <div
      className={
        "w-full flex flex-col items-center justify-center gap-3 px-[33px] pb-[13px]"
      }
    >
      <Image
        src={deleteIconRed}
        alt={"deleteicon"}
        width={62}
        height={62}
        className={"!w-[62px] !rounded !h-[62px]"}
      />
      <Heading
        className={
          "md:!text-fs_36 text-fs_28 text-black font-outfit_semiBold leading-[45px]"
        }
      >
        {title}
      </Heading>
      <Paragraph
        className={
          "md:!text-fs_15 text-fs_15 !mx-auto !text-center !w-[36ch] text-black/35 font-outfit_regular leading-[20px]"
        }
      >
        {description}
      </Paragraph>

      <div
        className={
          "w-full flex flex-row items-center justify-center gap-2 mt-4"
        }
      >
        {!!actions?.length &&
          actions?.map((item, idx) => {
            return (
              <Button
                key={idx}
                label={item?.title}
                Icon={null}
                iconColor={""}
                iconSize={""}
                variant={item?.variant}
                className={"flex-1 !h-[46px]"}
                size={item?.size}
                onClick={item?.action}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DeleteDialogActionForm;
