/** @format */

import { Fragment } from "react";
import labels from "../../../../locale";
import Heading from "../../../atoms/heading";
import Paragraph from "../../../atoms/paragraph";
import Divider from "../../../atoms/divider";
import { formatNumberToUSLocale } from "../../../../utils";

const TransactionTable = ({ data }) => {
  const {
    paymentDetails,
    totalFullAmountRequiredForTheEvent,
    sub_Total,
    costsByServices,
    venue,
    catering,
    photography,
    amountPaidDownPayment,
    finalPaymentDue,
    twentyFourHoursBeforeEvent,
    omanCurrency,
  } = labels;

  return (
    <div
      className={
        "bg-c_F6F6F69E rounded-2xl py-[30px] px-[24px] md:px-[34px] mt-[34px] mb-[30px]"
      }
    >
      <Heading
        className={
          "text-fs_28 md:text-fs_20 text-black font-outfit_semiBold leading-[14px]"
        }
      >
        {paymentDetails}
      </Heading>
      <div
        className={
          "flex md:flex-row flex-col md:items-center justify-between mt-5"
        }
      >
        <Paragraph
          className={
            "text-fs_20 md:text-fs_20 text-c_818181 font-outfit_regular leading-[16px] md:leading-[28px]"
          }
        >
          {totalFullAmountRequiredForTheEvent}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px] md:mt-0 mt-2"
          }
        >
          {`${formatNumberToUSLocale(data?.total)} ${omanCurrency}`}
        </Heading>
      </div>

      <div className={"mt-5 mb-6"}>
        <Divider />
      </div>

      <Paragraph
        className={
          "text-fs_23 md:text-fs_20 text-black font-outfit_semiBold leading-[14px]"
        }
      >
        <Fragment>
          {sub_Total}
          <span className={"!text-fs_16 font-outfit_medium leading-[25px]"}>
            {` (${costsByServices})`}
          </span>
        </Fragment>
      </Paragraph>

      <div
        className={
          "flex md:flex-row flex-col md:items-center justify-between my-3"
        }
      >
        <Paragraph
          className={
            "text-fs_20 capitalize md:text-fs_20 text-c_818181 font-outfit_regular leading-[14px]"
          }
        >
          {venue}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px]"
          }
        >
          {`${formatNumberToUSLocale(data?.venueCost)} ${omanCurrency}`}
        </Heading>
      </div>

      <div
        className={
          "flex md:flex-row flex-col md:items-center justify-between my-3"
        }
      >
        <Paragraph
          className={
            "text-fs_20 capitalize md:text-fs_20 text-c_818181 font-outfit_regular leading-[14px]"
          }
        >
          {catering}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px]"
          }
        >
          {`${formatNumberToUSLocale(data?.cateringCost)} ${omanCurrency}`}
        </Heading>
      </div>

      <div
        className={
          "flex md:flex-row flex-col md:items-center justify-between my-3"
        }
      >
        <Paragraph
          className={
            "text-fs_20 capitalize md:text-fs_20 text-c_818181 font-outfit_regular leading-[14px]"
          }
        >
          {photography}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px]"
          }
        >
          {`${formatNumberToUSLocale(data?.photoGraphyCost)} ${omanCurrency}`}
        </Heading>
      </div>

      <div className={"mt-5 mb-6"}>
        <Divider />
      </div>

      <div
        className={"flex md:flex-row flex-col md:items-center justify-between"}
      >
        <Paragraph
          className={
            "text-fs_20 capitalize md:text-fs_20 text-c_818181 font-outfit_regular leading-[14px]"
          }
        >
          {amountPaidDownPayment}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px] md:mt-0 mt-2"
          }
        >
          {`${formatNumberToUSLocale(data?.downPayment)} ${omanCurrency}`}
        </Heading>
      </div>

      <div
        className={
          "flex md:flex-row flex-col md:items-center justify-between md:mt-0 mt-4"
        }
      >
        <Paragraph
          className={
            "text-fs_20 capitalize md:text-fs_20 text-c_818181 font-outfit_regular leading-[14px]"
          }
        >
          {`${finalPaymentDue}: "${twentyFourHoursBeforeEvent}"`}
        </Paragraph>
        <Heading
          className={
            "text-fs_20 md:text-fs_20 text-black font-outfit_semiBold leading-[14px] md:mt-0 mt-2"
          }
        >
          {`${data?.finalPayment} ${omanCurrency}`}
        </Heading>
      </div>
    </div>
  );
};

export default TransactionTable;
