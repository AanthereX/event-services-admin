/** @format */

import moment from "moment";
import { Icons } from "../../../../assets/icons";
import Button from "../../../atoms/button";
import Table from "../../../organisms/table";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import Heading from "../../../atoms/heading";
import { Fragment } from "react";
import { DynamicRoutes } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const UsersDetailEventsTable = ({
  data,
  pageData,
  loading,
  onStatusChange = () => {},
}) => {
  const navigate = useNavigate();
  const { ChevronRight } = Icons;

  return (
    <Fragment>
      <div
        className={
          "w-full flex rounded-2xl bg-white border border-c_D1D1D1 flex-col items-center justify-start gap-y-2"
        }
      >
        <Heading
          className={
            "w-full text-c_282828 mt-[19px] ml-[36px] mb-1 capitalize text-start !text-fs_24 font-outfit_semiBold leading-[14px]"
          }
        >
          {labels.events}
        </Heading>

        <Table
          headers={labels?.userDetailEventsHeader}
          notFoundTitle={labels?.noEventsFound}
          notFoundDescription={labels.noUserEventsFoundDescription}
          listData={data}
          pageData={pageData}
          loading={loading}
          tableClassName={"mt-1"}
          headerClassName={"!text-c_454545 !font-outfit_light"}
          renderItem={(item, index, pageNumber) => {
            return (
              <tr
                className="!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
                key={item?.id}
              >
                <td
                  className={`px-8 py-2 font-outfit_regular text-c_202224 !min-w-24`}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">
                      {item?.name ?? labels.notAvailable}
                    </span>
                  </div>
                </td>
                <td className="min-w-48 px-3 py-2">
                  <div className="cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224">
                    <span className="font-outfit_regular truncate text-black">
                      {moment(item?.createdAt)
                        .utc()
                        .format("DD-MM-YYYY - hh:mm A")}
                    </span>
                  </div>
                </td>
                <td className={"min-w-48 px-3 py-2"}>
                  <div
                    className={
                      "cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224"
                    }
                  >
                    <span className={"font-outfit_regular truncate text-black"}>
                      {`${item?.startTime} - ${item?.endTime}`}
                    </span>
                  </div>
                </td>
                <td
                  className={
                    "min-w-20 px-3 py-2 font-outfit_regular capitalize"
                  }
                >
                  <ToggleSwitch
                    status={item?.visibility}
                    onChange={() => onStatusChange(item?.id)}
                  />
                </td>
                <td
                  className={"px-3 min-h-[100%] py-4 gap-2 flex items-center"}
                >
                  <Button
                    onClick={() => {
                      navigate(`${DynamicRoutes.EVENTSDETAILS}/${item?.id}`, {
                        state: {
                          ...item,
                        },
                      });
                    }}
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
    </Fragment>
  );
};

export default UsersDetailEventsTable;
