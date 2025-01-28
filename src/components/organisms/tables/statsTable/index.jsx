/** @format */

import React from "react";
import Table from "../../../organisms/table";
import ToggleSwitch from "../../../atoms/toggleSwitch";

import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Button from "../../../atoms/button";
import { useNavigate } from "react-router-dom";
const { ChevronRight, EditIcon, CrossIcon, CheckIcon } = Icons;
const StatsTable = ({ header = [], data = [], type = "" }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table
        headers={header}
        notFoundTitle={labels?.noVendorsAddedYet}
        notFoundDescription={labels?.vendorNotFoundDescription}
        listData={data}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className='!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_medium border-b-[0.6px] border-c_D4D4D4 last:border-0 '
              key={item?.id}
            >
              <td className='pl-8 min-w-48 px-3 py-2 '>
                <div
                  onClick={() => handleNavigate(item)}
                  className='cursor-pointer flex justify-start items-center gap-3 font-medium  text-c_202224'
                >
                  <span className='font-outfit_medium truncate text-black'>
                    {item?.name}
                  </span>
                </div>
              </td>
              <td className=' py-2 font-outfit_medium  text-c_202224  !min-w-32'>
                <div className='flex items-center gap-2'>
                  <UserImage />
                  <span className='truncate'> {item?.ownerName}</span>
                </div>
              </td>
              <td className='min-w-20 px-3 truncate py-2 font-outfit_medium  text-c_202224'>
                {item?.totalBookings}
              </td>
              <td className='min-w-20  px-3 py-2 font-outfit_medium  text-c_202224'>
                {item?.totalRevenue}
              </td>

              <td className='min-w-20  px-3  min-h-[100%] py-4 gap-2 flex  items-center '>
                <Button
                  onClick={() =>
                    navigate("/stats/details", {
                      state: {
                        data: item,
                        type,
                      },
                    })
                  }
                  // title={<img src={ChevronRight} alt="Delete Icon" />}
                  img={ChevronRight}
                  imgClassName={"!w-[14px] !h-[14px]  "}
                  className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
                />
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default StatsTable;
