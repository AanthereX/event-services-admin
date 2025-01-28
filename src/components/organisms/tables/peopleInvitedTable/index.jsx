/** @format */

import labels from "../../../../locale";
import Table from "../../../organisms/table";
import UserImage from "../../../atoms/userImage";
import { returnStatusColor } from "../../../../utils";
import { Icons } from "../../../../assets/icons";

const PeopleInvitedTable = ({
  pageData = {},
  loading,
  invitees,
  setInvitees,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  return (
    <Table
      headers={labels?.peopleInvitedHeader}
      notFoundTitle={labels?.inviteesNotFound}
      notFoundDescription={labels?.inviteesNotFoundDescription}
      listData={invitees}
      loading={loading}
      getData={getData}
      pageData={pageData}
      headerBgTransparent
      showHeaderCellPadding={false}
      tableVerticalMargin={"my-0"}
      headerClassName={
        "!bg-transparent !font-outfit_regular !leading-[20px] !text-c_9EA2A5 !px-0"
      }
      renderItem={(item, idx, pageNumber) => {
        return (
          <tr
            className="!rounded-md min-w-48 text-c_121212 font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0 "
            key={item?.id}
          >
            <td className="py-2 pr-3 font-outfit_regular text-c_202224 !min-w-10">
              <div className="flex items-center gap-2">
                <span className="truncate text-fs_15">{idx + 1}</span>
              </div>
            </td>
            <td className="min-w-48 py-2">
              <div className="flex items-center gap-2">
                <UserImage image={item?.user?.image || Icons.DefaultAvatar} />
                <span className="truncate text-fs_15 font-outfit_medium">
                  {item?.user?.fullName || labels.notAvailable}
                </span>
              </div>
            </td>
            <td className="min-w-40 truncate text-fs_15 py-2 font-outfit_regular text-c_202224">
              {item?.user?.email || labels.notAvailable}
            </td>
            <td className="min-w-40 truncate text-fs_15 py-2 font-outfit_regular text-c_202224">
              {item?.user?.phoneNumber || labels.notAvailable}
            </td>
            <td className="min-w-20 truncate text-fs_15 py-2 capitalize font-outfit_regular text-c_202224">
              <span className={`${returnStatusColor(item?.status)}`}>
                {item?.status}
              </span>
            </td>
          </tr>
        );
      }}
    />
  );
};

export default PeopleInvitedTable;
