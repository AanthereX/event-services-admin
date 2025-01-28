/** @format */

import { Fragment } from "react";
import Image from "../../../atoms/image";
import Paragraph from "../../../atoms/paragraph";
import labels from "../../../../locale";
import Heading from "../../../atoms/heading";
import Button from "../../../atoms/button";
import BadgePill from "../../../atoms/badgePill";

const DialogModal = ({
  modalImg = null,
  modalImgAlt = "",
  modalImgClassName = "",
  width = 64,
  height = 64,
  btnOptions = [],
  title = "",
  tagline = "",
  showContentList = [],
}) => {
  return (
    <Fragment>
      <div
        className={
          "w-full relative flex flex-col items-center justify-center h-fit min-h-fit rounded-2xl md:pt-0 md:px-6 pt-5 px-5"
        }
      >
        {modalImg && (
          <Image
            src={modalImg}
            alt={modalImgAlt}
            width={width}
            height={height}
            className={`absolute -top-28 left-50 translate-y-[50%] w-[64px] h-[64px] ${modalImgClassName}`}
          />
        )}
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <Heading
            className={
              "font-outfit_semiBold text-center text-black text-fs_22 md:text-fs_24 leading-[30px]"
            }
          >
            {title}
          </Heading>
          <Paragraph
            className={
              "font-outfit_regular md:w-[36ch] w-[30ch] text-center !text-c_747474 text-fs_16 md:text-fs_16 leading-[17px]"
            }
          >
            {tagline}
          </Paragraph>
        </div>

        <div
          className={
            "w-full flex flex-row items-center justify-center mt-5 mb-2 gap-3"
          }
        >
          {btnOptions?.length
            ? btnOptions?.map((item, idx) => {
                return (
                  <Button
                    key={idx}
                    variant={item?.variant}
                    isLoading={item?.loader}
                    size={item?.size}
                    label={item?.label}
                    className={`w-1/3 ${item?.className}`}
                    onClick={item?.action}
                  />
                );
              })
            : null}

          {!!showContentList && !btnOptions?.length ? (
            <div
              className={
                "w-full flex flex-wrap items-center justify-center gap-3 mb-3"
              }
            >
              {showContentList?.map((item, idx) => {
                return (
                  <BadgePill
                    key={idx}
                    variant={"secondary"}
                    size={"sm"}
                    label={item?.category?.nameEn}
                    className={`flex-1 !max-w-fit !whitespace-nowrap !px-4`}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default DialogModal;
