/** @format */

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Table from "../../../organisms/table";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DynamicRoutes } from "../../../../constants";
import {
  checkTransactionsStatus,
  formatNumberToUSLocale,
  returnStatusColor,
} from "../../../../utils";

const ServiceTransactionHistoryTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
}) => {
  const navigate = useNavigate();
  const {
    ChevronRight,
    EditIcon,
    CrossIcon,
    CheckIcon,
    deleteIconRed,
    deleteIconRedWithoutBg,
  } = Icons;
  const dummyTransactions = [
    {
      id: uuidv4(),
      requestId: "TX-987654",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Catering",
      },
      total: "1100",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Catering",
      slots: [
        new Date("2024-08-10"),
        new Date("2024-08-11"),
        new Date("2024-08-12"),
      ],
      timeStamp: new Date(),
      timeStampEnd: new Date(),
      status: "remainingPayment",
    },
    {
      id: uuidv4(),
      requestId: "TX-997014",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Photography",
      },
      total: "1050",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Photography",
      slots: [
        new Date("2024-05-09"),
        new Date("2024-05-10"),
        new Date("2024-05-11"),
      ],
      timeStamp: new Date("2024-05-11"),
      timeStampEnd: new Date("2024-05-12"),
      status: "downPayment",
    },
    {
      id: uuidv4(),
      requestId: "TX-886554",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Entertainment",
      },
      total: "100",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Catering",
      slots: [new Date("2024-01-01"), new Date("2024-01-03")],
      timeStamp: new Date("2024-05-20"),
      timeStampEnd: new Date("2024-05-21"),
      status: "remainingPayment",
    },
    {
      id: uuidv4(),
      requestId: "TX-771132",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Decoration",
      },
      total: "8000",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Music",
      slots: [
        new Date("2024-05-01"),
        new Date("2024-06-10"),
        new Date("2024-06-11"),
      ],
      timeStamp: new Date("2024-05-25"),
      timeStampEnd: new Date("2024-05-26"),
      status: "downPayment",
    },
    {
      id: uuidv4(),
      requestId: "TX-186745",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Catering",
      },
      total: "8000",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Photography",
      slots: [new Date("2024-02-01"), new Date("2024-02-05")],
      timeStamp: new Date("2024-05-01"),
      timeStampEnd: new Date("2024-05-02"),
      status: "remainingPayment",
    },
    {
      id: uuidv4(),
      requestId: "TX-190104",
      provider: {
        name: "John Doe",
        email: "john.doe@gmail.com",
      },
      service: {
        type: "Decoration",
      },
      total: "8000",
      eventName: "Lily & Adam's Engagement Party",
      serviceName: "Catering",
      slots: [new Date("2024-05-10")],
      timeStamp: new Date("2024-03-03"),
      timeStampEnd: new Date("2024-04-04"),
      status: "downPayment",
    },
  ];
  const [transactions, setTransactions] = useState(dummyTransactions);
  const costingData = {
    total: 10000,
    venueCost: 2000,
    cateringCost: 2000,
    photoGraphyCost: 1000,
    downPayment: 1000,
    finalPayment: 9000,
  };
  return (
    <div>
      <Table
        headers={labels?.serviceTransactionHeader}
        notFoundTitle={labels?.noRequestFound}
        notFoundDescription={labels?.noRequestDescription}
        listData={transactions}
        pageData={pageData}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className='!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0'
              key={item?.id}
            >
              <td className={`px-8 py-2 font-outfit_regular text-c_202224`}>
                <div className='flex items-center gap-2'>
                  <span className='truncate'>{`${item?.requestId}`}</span>
                </div>
              </td>
              <td className='min-w-20 px-3 py-2'>
                <span className='font-outfit_regular truncate text-black'>
                  {item?.serviceName}
                </span>
              </td>
              <td className='min-w-20 px-3 py-2'>
                <span className='font-outfit_regular truncate text-black'>
                  {item?.eventName}
                </span>
              </td>
              <td
                className={`min-w-20 px-3 py-2 font-outfit_regular text-c_202224`}
              >
                <div className={"flex items-center gap-2"}>
                  <UserImage />
                  <span
                    className={"truncate"}
                  >{`${item?.provider?.name}`}</span>
                </div>
              </td>
              <td className='min-w-20 px-3 py-2'>
                <div
                  onClick={() => {}}
                  className='cursor-pointer flex justify-start items-center gap-3 font-medium  text-c_202224'
                >
                  <span className='font-outfit_regular truncate text-black'>
                    {`${formatNumberToUSLocale(item?.total)} ${
                      labels.omanCurrency
                    }`}
                  </span>
                </div>
              </td>
              <td className='min-w-20 px-3 truncate py-2 font-outfit_regular text-c_202224'>
                {moment(item?.createdAt).format("DD-MM-YYYY")}
              </td>
              <td
                className={`min-w-20 px-3 truncate py-2 font-outfit_regular ${returnStatusColor(
                  item?.status,
                )}`}
              >
                {checkTransactionsStatus(item?.status, labels)}
              </td>

              <td
                className={`min-w-20 px-3 py-2 font-outfit_regular capitalize`}
              >
                <div className={"flex items-center gap-1"}>
                  <Button
                    onClick={() =>
                      navigate(
                        `${DynamicRoutes.TRANSACTIONDETAILS}/${item?.id}`,
                        {
                          state: {
                            ...item,
                            costing: costingData,
                          },
                        },
                      )
                    }
                    img={ChevronRight}
                    imgClassName={"!w-[12px] !h-[12px]"}
                    className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
                  />
                </div>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default ServiceTransactionHistoryTable;
