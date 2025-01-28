/** @format */

import { useNavigate } from "react-router-dom";
import Table from "../../../organisms/table";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Image from "../../../atoms/image";
import { DynamicRoutes } from "../../../../constants";
const { ChevronRight, starIcon, DefaultAvatar } = Icons;

const VenuesPageTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  venues,
  setVenues,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table
        headers={labels?.venuePageHeader}
        notFoundTitle={labels?.noVenuesFound}
        notFoundDescription={labels?.venuesNotFoundDescription}
        loading={loading}
        listData={venues}
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
                className={
                  "pl-8 py-2 font-outfit_medium text-c_202224 !min-w-24"
                }
              >
                <span className={"font-outfit_medium truncate text-black"}>
                  {item?.name ?? labels.notAvailable}
                </span>
              </td>
              <td className={"min-w-48 px-3 py-2"}>
                <div
                  className={
                    "cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <div className={"flex items-center gap-2"}>
                    <UserImage image={item?.user?.image ?? DefaultAvatar} />
                    <span className={"truncate"}>
                      {item?.user?.fullName ?? labels.notAvailable}
                    </span>
                  </div>
                </div>
              </td>
              <td
                className={
                  "min-w-40 px-3 truncate py-2 font-outfit_medium text-c_202224"
                }
              >
                {item?.location ?? labels.notAvailable}
              </td>
              <td
                className={
                  "min-w-40 px-3 py-2 font-outfit_medium text-c_202224"
                }
              >
                {item?.guestCapacity ?? labels.notAvailable}
              </td>

              <td
                className={`min-w-20 gap-1 px-3 py-2 font-outfit_medium capitalize`}
              >
                <div className={"flex gap-1 items-start"}>
                  <Image src={starIcon} alt={"Ratings Star Icon"} />
                  <span>
                    ({item?.user?.avgRate !== 0 ? item?.user?.avgRate : 0})
                  </span>
                </div>
              </td>
              <td
                className={"min-w-20 px-3 py-2 font-outfit_medium capitalize"}
              >
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
                {/* <Button
                  onClick={() => setEdit({ ...item, index })}
                  img={EditIcon}
                  imgClassName={"!w-4 !h-4  "}
                  className={`flex !w-8 justify-center  items-center rounded-[4px]  !bg-c_5669FF33 !p-2`}
                /> */}
                <Button
                  onClick={() =>
                    navigate(`${DynamicRoutes.VENUESDETAILS}/${item?.id}`, {
                      state: {
                        data: item,
                      },
                    })
                  }
                  title={<img src={ChevronRight} alt='Delete Icon' />}
                  img={ChevronRight}
                  imgClassName={"!w-[14px] !h-[14px]"}
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

export default VenuesPageTable;
