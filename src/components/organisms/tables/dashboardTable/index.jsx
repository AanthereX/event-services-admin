/** @format */

import React from "react";
import labels from "../../../../locale";
import moment from "moment";
import { Icons } from "../../../../assets/icons";
import Button from "../../../atoms/button";
import Table from "../../table";

const DashboardTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  events,
  setEvents = () => {},
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  const { ChevronRight } = Icons;

  return (
    <div>
      <Table
        headers={labels?.dashboardTableHeaderData}
        notFoundTitle={labels?.noEventsFound}
        notFoundDescription={labels?.noEventsDescription}
        loading={loading}
        listData={events}
        pageData={pageData}
        getData={getData}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className={
                "!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
              }
              key={item?.id}
            >
              <td
                className={
                  "px-8 py-2 font-outfit_regular text-c_202224 !min-w-24"
                }
              >
                <div className={"flex items-center gap-2"}>
                  <span className={"truncate"}>{`${
                    item?.name ?? labels.notAvailable
                  }`}</span>
                </div>
              </td>
              <td className={"min-w-48 px-3 py-2"}>
                <div
                  className={
                    "cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_regular truncate text-black"}>
                    {item?.user?.fullName ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "min-w-40 px-3 truncate py-2 font-outfit_regular text-c_202224"
                }
              >
                {!!item?.venueBooking?.length
                  ? moment(
                      item?.venueBooking
                        ?.find((val) => val)
                        ?.venueBookingDetails?.map(
                          (item) => item?.venueAvailability?.date,
                        ),
                    ).format("DD-MM-YYYY")
                  : labels.notAvailable}
              </td>
              <td className={"px-3 min-h-[100%] py-4 gap-2 flex items-center"}>
                <Button
                  img={ChevronRight}
                  imgClassName={"!w-3 !h-3"}
                  className={
                    "!w-5 !h-fit flex justify-center items-center !bg-transparent"
                  }
                />
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default DashboardTable;
