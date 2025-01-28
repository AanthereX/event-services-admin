/** @format */

import React, { useState } from "react";
import Heading from "../../../atoms/heading";
import Paragraph from "../../../atoms/paragraph";
import ButtonBadgeList from "../../../molecules/buttonBadgelist";
import labels from "../../../../locale";
import { Icons } from "../../../../assets/icons";
import Button from "../../../atoms/button";
import Divider from "../../../atoms/divider";
import DateInput from "../../../atoms/dateInput";
import Image from "../../../atoms/image";

const ChangeRequestModal = ({ data = {}, setOpenModal = () => {} }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const { CalenderIco, RightArrow, CalenderGray, CalenderIconDarkBlue } = Icons;

  console.log(
    data?.event?.venueBooking[0]?.venueBookingDetails[0]?.venueAvailability
      ?.date,
    "data",
  );

  return (
    <div className="py-3 px-6 flex flex-col gap-3">
      <div className="bg-c_00000008 p-3 flex flex-col gap-2 rounded-[12px]">
        <Heading className="!font-outfit_medium md:!text-fs_20 !text-fs_18">
          {data?.event?.name ?? labels.notAvailable}
        </Heading>
        <Paragraph className="text-c_818181 !font-outfit_regular !text-fs_16 md:!text-fs_16">
          {data?.event?.description ?? labels.notAvailable}
        </Paragraph>
        <div className={"flex md:items-center items-start gap-2 md:pt-0 pt-2"}>
          <Image src={CalenderIco} alt={"calendaricon"} />
          <ButtonBadgeList
            data={
              data?.event?.venueBooking[0]?.venueBookingDetails[0]
                ?.venueAvailability?.date ?? []
            }
            btnClassName={"!min-h-[22px] !text-fs_14 !px-[6px] !py-[4px]"}
          />
        </div>
      </div>

      <Divider />
      <div>
        <Heading className="!text-fs_20 !font-outfit_medium md:!text-fs_20">
          {labels.request}
        </Heading>
        <Paragraph className="text-c_818181 mt-1 !font-outfit_regular !text-fs_16 md:!text-fs_16">
          {data?.description ?? labels.notAvailable}
        </Paragraph>
      </div>
      {!isAccepted && (
        <div className="flex items-center gap-1 mt-3">
          <Button
            onClick={() => setOpenModal(null)}
            //   img={CrossIcon}
            label={labels.reject}
            className={`flex justify-center !h-[52px] items-center md:!text-fs_18 !text-fs_14 !font-outfit_regular !text-white !bg-c_EF394A !py-2 px-3`}
          />
          <Button
            onClick={() => setIsAccepted(true)}
            //   img={CheckIcon}
            label={labels.accept}
            className={`flex justify-center !h-[52px] md:!text-fs_18 !text-fs_14 !font-outfit_regular items-center !text-white !bg-c_2CBD4D !py-2 px-3`}
          />
        </div>
      )}

      {isAccepted ? (
        <>
          <Divider />

          <div className="w-full flex grid grid-cols-12 items-center">
            <Heading className="!text-fs_20 col-span-6 !font-outfit_medium md:!text-fs_20">
              {labels.oldDate}
            </Heading>
            <Heading className="!text-fs_20 col-span-6 !font-outfit_medium md:!text-fs_20">
              {labels.newDate}
            </Heading>
          </div>

          {data?.services?.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex grid grid-cols-12 gap-2 items-center"
              >
                <div className="flex items-center col-span-5 h-[46px] border border-c_5669FF33 bg-gradient-to-r from-g_5669FF33 to-g_4D5BCA33 rounded-lg">
                  <div className="flex items-center gap-2 p-2">
                    <Image
                      src={CalenderIconDarkBlue}
                      width={16}
                      height={16}
                      alt={"calendaricon"}
                      className={"!h-[16px] !w-[16px]"}
                    />
                    <Paragraph
                      className={
                        "!font-outfit_regular whitespace-nowrap text-c_5669FF !text-fs_14 md:!text-fs_16"
                      }
                    >
                      {ele}
                    </Paragraph>
                  </div>
                </div>
                <div className={"col-span-1"}>
                  <Image src={RightArrow} alt={"rightarrow"} />
                </div>
                <div className={"relative col-span-6"}>
                  <DateInput
                    leftIcon={true}
                    leftIconImage={CalenderGray}
                    placeholderText={"Select Date"}
                  />
                </div>
              </div>
            );
          })}
          <Button
            onClick={() => setOpenModal(false)}
            //   img={CheckIcon}
            label={labels.update}
            className={`flex justify-center !h-[52px] md:!text-fs_18 !text-fs_18 !font-outfit_regular items-center !text-white !bg-c_primary !py-2 px-3`}
          />
        </>
      ) : null}
    </div>
  );
};

export default ChangeRequestModal;
