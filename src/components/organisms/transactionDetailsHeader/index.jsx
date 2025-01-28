/** @format */

import Paragraph from "../../atoms/paragraph";
import UserImage from "../../atoms/userImage";

import labels from "../../../locale";
import { checkTransactionsStatus, returnStatusColor } from "../../../utils";

import moment from "moment";
import BadgePill from "../../atoms/badgePill";

const TransactionDetailsHeader = ({
  transactionID = "",
  status = "",
  eventTitle = "",
  provider = {},
  eventDates,
  timeStamp = "",
  timeStampEnd = "",
}) => {
  const { transactionId, paymentStatus, eventName, eventOwner, date, time } =
    labels;

  return (
    <div className={"w-full flex flex-col items-center justify-between"}>
      <div
        className={
          "w-full flex md:flex-row flex-col md:items-center justify-between mt-[30px]"
        }
      >
        <div className={"flex flex-col items-start justify-center gap-1"}>
          <Paragraph
            className={
              "font-outfit_regular !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {transactionId}
          </Paragraph>
          <Paragraph
            className={
              "font-outfit_regular text-c_121212 text-fs_18 leading-[22px]"
            }
          >
            {transactionID}
          </Paragraph>
        </div>
        <div className={"flex flex-col items-start justify-center gap-1"}>
          <Paragraph
            className={
              "font-outfit_regular !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {paymentStatus}
          </Paragraph>
          <Paragraph
            className={`font-outfit_regular tracking-[-0.3px] md:text-fs_14 text-fs_14 leading-[22px] ${returnStatusColor(
              status,
            )}`}
          >
            {checkTransactionsStatus(status, labels)}
          </Paragraph>
        </div>
      </div>
      <div
        className={
          "w-full flex md:flex-row flex-col items-center justify-between mt-[30px]"
        }
      >
        <div className={"flex flex-col items-start justify-center gap-0"}>
          <Paragraph
            className={
              "font-outfit_regular capitalize !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {eventName}
          </Paragraph>
          <Paragraph
            className={
              "!font-outfit_medium !text-c_121212 !text-fs_24 !leading-[30px]"
            }
          >
            {eventTitle}
          </Paragraph>
        </div>
      </div>
      <div
        className={
          "w-full flex flex-wrap flex-row items-center justify-start gap-[30px] mt-[25px]"
        }
      >
        <div className={"flex flex-col justify-center items-start gap-2"}>
          <Paragraph
            className={
              "font-outfit_regular capitalize !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {eventOwner}
          </Paragraph>
          <div className={"flex items-center gap-2"}>
            <UserImage />
            <span
              className={"truncate font-outfit_medium"}
            >{`${provider?.name}`}</span>
          </div>
        </div>
        <div className={"flex flex-col justify-start items-start gap-2"}>
          <Paragraph
            className={
              "font-outfit_regular capitalize !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {date}
          </Paragraph>
          <div className={"flex flex-row items-center justify-start gap-[9px]"}>
            {eventDates?.map((date, idx) => {
              return (
                <BadgePill
                  className={""}
                  size={"sm"}
                  variant={"secondary"}
                  rounded={"rounded-[6px]"}
                  label={moment(date).format("DD-MM-YYYY")}
                />
              );
            })}
          </div>
        </div>
        <div className={"flex flex-col justify-start items-start gap-2"}>
          <Paragraph
            className={
              "font-outfit_regular capitalize !text-c_818181 text-fs_18 leading-[22px]"
            }
          >
            {time}
          </Paragraph>
          <Paragraph className={"font-outfit_medium"}>{`${moment(
            timeStamp,
          ).format("hh:mm A")} - ${moment(timeStampEnd).format(
            "hh:mm A",
          )}`}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsHeader;
