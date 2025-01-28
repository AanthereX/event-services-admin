/** @format */

import React from "react";
import Paragraph from "../../../atoms/paragraph";
import labels from "../../../../locale";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import Table from "../../../organisms/table";
import UserImage from "../../../atoms/userImage";
import Button from "../../../atoms/button";
import { venuesData } from "../../../../constants/Venue.constants";
import { Icons } from "../../../../assets/icons";
import { servicesData } from "../../../../constants/Service.constants";
import moment from "moment";
import {
  checkTransactionsStatus,
  kFormatter,
  returnStatusColor,
} from "../../../../utils";
import { DynamicRoutes } from "../../../../constants";
import { useNavigate } from "react-router-dom";
const { ChevronRight } = Icons;

const ServiceTable = ({
  count,
  setCount = () => {},
  serviceId = "",
  loading = false,
  pageData = {},
  listData = [],
  handlerGetAllServicesRequests = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <Table
      headers={labels?.serviceRequestHeader}
      notFoundTitle={labels?.noServiceRequestsAddedYet}
      notFoundDescription={labels?.serviceRequestsNotFoundDescription}
      listData={listData}
      pageData={pageData}
      loading={loading}
      getData={handlerGetAllServicesRequests}
      headerClassName={"!text-c_454545 !font-outfit_light"}
      renderItem={(item, index, pageNumber) => {
        return (
          <tr
            className="!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0 "
            key={item?.id}
          >
            <td
              className={
                "pl-8 py-2 font-outfit_medium text-c_202224 !min-w-fit"
              }
            >
              <div className="flex items-center gap-2">
                <UserImage image={item?.user?.image || Icons.DefaultAvatar} />
                <span className="!whitespace-nowrap">
                  {item?.user?.fullName || labels.notAvailable}
                </span>
              </div>
            </td>
            <td className="min-w-fit px-3 py-2 ">
              <div className="cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224">
                <span className="font-outfit_medium  text-black">
                  {item?.user?.email || labels.notAvailable}
                </span>
              </div>
            </td>
            <td className="min-w-fit px-3 py-2 font-outfit_medium text-c_202224">
              {item?.event?.name || labels.notAvailable}
            </td>
            <td className="min-w-fit px-3 py-2 font-outfit_medium text-c_202224">
              {moment(
                item?.serviceBookingDetails?.find((val) => val)
                  ?.venueAvailability?.date,
              ).format("DD-MM-YYYY - hh:mm A")}
            </td>
            <td className="min-w-fit px-3  py-2 font-outfit_medium text-c_202224">
              {item?.service?.name || labels.notAvailable}
            </td>
            <td className="min-w-fit px-3 py-2 font-outfit_medium text-c_202224">
              {kFormatter(item?.totalPrice) || labels.notAvailable}
            </td>
            <td
              className={`min-w-fit capitalize px-3 py-2 font-outfit_medium   
                ${returnStatusColor(item?.paymentStatus)}
                `}
            >
              {checkTransactionsStatus(item?.paymentStatus, labels) ||
                labels.notAvailable}
            </td>

            <td
              className={
                "min-w-fit px-3 min-h-[100%] py-4 gap-2 flex items-center"
              }
            >
              <Button
                onClick={
                  () => {}
                  // navigate(`${DynamicRoutes.EVENTSERVICEDETAILS}/${item?.id}`, {
                  //   state: {
                  //     data: item,
                  //   },
                  // })
                }
                img={ChevronRight}
                imgClassName={"!w-[14px] !h-[14px]  "}
                className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
              />
            </td>
          </tr>
        );
      }}
    />
  );
};

export default ServiceTable;
