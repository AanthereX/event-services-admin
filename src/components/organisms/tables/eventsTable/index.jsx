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
import { eventServicesData } from "../../../../constants/EventServices.constants";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DynamicRoutes } from "../../../../constants";
const { ChevronRight, starIcon, EditIcon, DefaultAvatar } = Icons;

const EventsTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  events,
  setEvents,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <Table
      headers={labels?.eventHeader}
      notFoundTitle={labels?.eventNotFound}
      notFoundDescription={labels?.eventNotFoundDescription}
      loading={loading}
      listData={events}
      pageData={pageData}
      getData={getData}
      headerClassName={"!text-c_454545 !font-outfit_light"}
      renderItem={(item, index, pageNumber) => {
        return (
          <tr
            className={
              "!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_medium border-b-[0.6px] border-c_D4D4D4 last:border-0"
            }
            key={item?.id}
          >
            <td
              className={"pl-8 py-2 font-outfit_medium text-c_202224 !min-w-24"}
            >
              <div className={"flex items-center gap-2"}>
                <span className={"truncate"}>
                  {item?.name ?? labels.notAvailable}
                </span>
              </div>
            </td>
            <td className={"min-w-48 px-3 py-2"}>
              <div className={"flex items-center gap-2"}>
                <UserImage image={item?.user?.image ?? DefaultAvatar} />
                <span className={"truncate"}>
                  {item?.user?.fullName ?? labels.notAvailable}
                </span>
              </div>
            </td>
            <td
              className={
                "min-w-40 px-3 truncate py-2 font-outfit_medium text-c_202224"
              }
            >
              {!!item?.createdAt
                ? moment(item?.createdAt).format("DD-MM-YYYY")
                : labels.notAvailable}
            </td>
            <td
              className={
                "min-w-40 px-3 truncate py-2 font-outfit_medium text-c_202224"
              }
            >
              {!!item?.startTime && !!item?.endTime
                ? `${item?.startTime} - ${item?.endTime}`
                : labels.notAvailable}
            </td>
            <td
              className={
                "min-w-20 px-3 capitalize truncate py-2 font-outfit_medium text-c_202224"
              }
            >
              {item?.eventType ?? labels.notAvailable}
            </td>

            <td className={`min-w-20 px-3 py-2 font-outfit_medium capitalize`}>
              <ToggleSwitch
                status={!!item?.visibility ? true : false}
                onStatusChange={() => onStatusChange(item?.id)}
              />
            </td>

            <td
              className={
                "min-w-20 px-3 min-h-[100%] py-4 gap-2 flex items-center"
              }
            >
              <Button
                onClick={() =>
                  navigate(`${DynamicRoutes.EVENTSDETAILS}/${item?.id}`, {
                    state: {
                      data: item,
                    },
                  })
                }
                img={ChevronRight}
                imgClassName={"!w-[14px] !h-[14px]"}
                className={
                  "!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0"
                }
              />
            </td>
          </tr>
        );
      }}
    />
  );
};

export default EventsTable;
