/** @format */

import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Table from "../../../organisms/table";
import { useNavigate } from "react-router-dom";
import { DynamicRoutes } from "../../../../constants";
import { useDispatch } from "react-redux";

const UsersTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  users,
  setUsers,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    ChevronRight,
    EditIcon,
    deleteIconRed,
    deleteIconRedWithoutBg,
    logo,
  } = Icons;

  return (
    <div>
      <Table
        headers={labels?.usersHeader}
        notFoundTitle={labels?.noUsersFound}
        loading={loading}
        notFoundDescription={labels?.noUsersDescription}
        listData={users}
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
                  <UserImage image={item?.image} />
                  <span className={"truncate"}>{`${
                    item?.fullName ?? labels.notAvailable
                  }`}</span>
                </div>
              </td>
              <td className={"min-w-48 px-3 py-2"}>
                <div
                  onClick={() =>
                    navigate(`${DynamicRoutes.USERDETAILS}/${item?.id}`, {
                      state: {
                        ...item,
                      },
                    })
                  }
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_regular truncate text-black"}>
                    {item?.email ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "min-w-40 px-3 truncate py-2 font-outfit_regular text-c_202224"
                }
              >
                {item?.phoneNumber ?? labels.notAvailable}
              </td>
              <td
                className={"min-w-20 px-3 py-2 font-outfit_regular capitalize"}
              >
                <ToggleSwitch
                  status={!!item?.visibility ? true : false}
                  onStatusChange={() => onStatusChange(item?.id)}
                />
              </td>

              <td className={"px-3 min-h-[100%] py-4 gap-2 flex items-center"}>
                {/* <Button
                  onClick={() => setShowDeleteModal(true)}
                  img={deleteIconRedWithoutBg}
                  imgClassName={"!w-[16px] !h-[16px]"}
                  className={`flex !w-8 !h-8 justify-center items-center !rounded !bg-c_5669FF33`}
                /> */}

                <Button
                  onClick={() => setEdit({ ...item, index })}
                  img={EditIcon}
                  imgClassName={"!w-fit !h-fit"}
                  className={
                    "flex !w-8 !h-8 justify-center items-center !rounded !bg-c_66A5C41F"
                  }
                />
                <Button
                  onClick={() =>
                    navigate(`${DynamicRoutes.USERDETAILS}/${item?.id}`, {
                      state: {
                        ...item,
                      },
                    })
                  }
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

export default UsersTable;
