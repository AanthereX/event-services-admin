/** @format */

import labels from "../../../../locale";
import Table from "../../../organisms/table";
import { DynamicRoutes } from "../../../../constants";
import moment from "moment";
import {
  checkTransactionsStatus,
  kFormatter,
  returnStatusColor,
} from "../../../../utils";

const TransactionHistoryTableEventDetail = ({
  pageData = {},
  transactions = [],
  loading = false,
  setEdit = () => {},
  setShowDeleteModal = () => {},
  paymentType,
}) => {
  return (
    <div>
      <Table
        headers={
          paymentType === "service"
            ? labels?.transactionHistoryHeaderService
            : paymentType === "venue"
            ? labels.transactionHistoryHeaderVenue
            : labels.transactionHistoryHeaderMonetaryGifts
        }
        notFoundTitle={labels?.notTransactions}
        notFoundDescription={labels?.noTransactionsDescription}
        listData={transactions}
        pageData={pageData}
        loading={loading}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className="!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
              key={item?.id}
            >
              <td className={`px-8 py-5 font-outfit_regular text-c_202224`}>
                <div className="flex items-center gap-2">
                  <span className={"truncate"}>{`${
                    item?.transactionId || labels.notAvailable
                  }`}</span>
                </div>
              </td>
              <td className={"min-w-20 px-3 py-2"}>
                <span className={"font-outfit_regular truncate text-black"}>
                  {item?.service?.name ||
                    item?.venues?.name ||
                    labels.notAvailable}
                </span>
              </td>
              <td className={"min-w-20 px-3 py-2"}>
                <div
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_regular truncate text-black"}>
                    {moment(item?.createdAt).utc().format("DD-MM-YYYY hh:mm A")}
                  </span>
                </div>
              </td>
              <td
                className={`min-w-20 px-3 py-2 font-outfit_medium capitalize`}
              >
                <span className={`${returnStatusColor(item?.status)}`}>
                  {checkTransactionsStatus(item?.status, labels)}
                </span>
              </td>
              <td
                className={
                  "min-w-20 px-3 truncate py-2 font-outfit_regular text-c_202224"
                }
              >
                {kFormatter(item?.amount)}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default TransactionHistoryTableEventDetail;
