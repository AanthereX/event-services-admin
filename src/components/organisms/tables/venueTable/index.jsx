/** @format */

import labels from "../../../../locale";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import Table from "../../../organisms/table";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import { DynamicRoutes } from "../../../../constants";
import { useNavigate } from "react-router-dom";
const { ChevronRight } = Icons;

const VenueTable = ({
  getData = () => {},
  onStatusChange = () => {},
  data,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <Table
      headers={labels?.VenueHeader}
      notFoundTitle={labels?.noVenuesAddedYet}
      notFoundDescription={labels?.venueNotFoundDescription}
      listData={data}
      loading={loading}
      getData={getData}
      loaderContainerClassName={"!h-[200px] !pb-10 !pt-10"}
      headerClassName={"!text-c_454545 !font-outfit_light"}
      renderItem={(item, index, pageNumber) => {
        return (
          <tr
            className="!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_medium border-b-[0.6px] border-c_D4D4D4 last:border-0 "
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
              <div className="cursor-pointer flex justify-start items-center gap-3 font-medium text-c_202224">
                <span className="font-outfit_medium truncate text-black">
                  {item?.location ?? labels.notAvailable}
                </span>
              </div>
            </td>
            <td
              className={
                "min-w-40 px-3 truncate py-2 font-outfit_medium text-c_202224"
              }
            >
              {item?.guestCapacity}
            </td>
            <td
              className={"min-w-40 px-3 py-2 font-outfit_medium text-c_202224"}
            >
              {`${item?.price} ${labels.omanCurrency}` || labels.notAvailable}
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
                  navigate(`${DynamicRoutes.VENUESDETAILS}/${item?.id}`, {
                    state: {
                      data: item,
                    },
                  })
                }
                img={ChevronRight}
                imgClassName={"!w-[14px] !h-[14px]"}
                className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
              />
            </td>
          </tr>
        );
      }}
    />
  );
};

export default VenueTable;
