/** @format */

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import Table from "../../../organisms/table";
import { useNavigate } from "react-router-dom";
import { DynamicRoutes } from "../../../../constants";

const VenuesFacilitiesTable = ({
  data,
  pageData = {},
  loading = false,
  setEdit = () => {},
  setShowDeleteModal = () => {},
  GoToDetailsPage = () => {},
  search,
  setSearch,
  setLoading,
  facilities,
  setFacilities,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
  showStatusUpdateModal = false,
  setShowStatusUpdateModal = () => {},
  selected,
  setSelected,
}) => {
  const navigate = useNavigate();
  const { ChevronRight, EditIcon, deleteIconRed, deleteIconRedWithoutBg } =
    Icons;

  return (
    <div>
      <Table
        headers={labels?.venuesFacilitiesHeader}
        notFoundTitle={labels?.noVenuesFacilitiesFound}
        notFoundDescription={labels?.noVenuesFacilitiesDiscription}
        listData={facilities}
        loading={loading}
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
                className={`px-8 py-2 font-outfit_regular text-c_202224 !min-w-32`}
              >
                <div className={"flex items-center gap-2"}>
                  <span className={"truncate"}>{`${item?.nameEn}`}</span>
                </div>
              </td>

              <td
                className={`px-3 py-2 font-outfit_regular text-c_202224 !min-w-32`}
              >
                <div className={"flex items-center"}>
                  <span className={"truncate"}>{`${item?.nameAr}`}</span>
                </div>
              </td>

              <td
                className={`min-w-32 px-3 py-2 font-outfit_regular capitalize`}
              >
                <ToggleSwitch
                  status={!!item?.visibility ? true : false}
                  onStatusChange={() => onStatusChange(item?.id)}
                />
              </td>

              <td className={"px-3 min-h-[100%] py-4 gap-5 flex items-center"}>
                {/* <Button
                  onClick={() => setShowDeleteModal(true)}
                  img={deleteIconRedWithoutBg}
                  imgClassName={"!w-[16px] !h-[16px]"}
                  width={16}
                  height={16}
                  className={`flex !w-8 !h-8 justify-center items-center rounded-[4px] !bg-c_5669FF33`}
                /> */}
                <Button
                  onClick={() => setEdit({ ...item, index })}
                  img={EditIcon}
                  imgClassName={"!w-fit !h-fit"}
                  className={`flex !w-8 !h-8 justify-center items-center !rounded !bg-c_66A5C41F`}
                />
                {/* <Button
                  onClick={() => {}}
                  img={ChevronRight}
                  imgClassName={"!w-3 !h-3"}
                  className={`!w-5 !h-fit flex justify-center items-center !bg-transparent`}
                /> */}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default VenuesFacilitiesTable;
