/** @format */

import TextInput from "../../atoms/input";
import { Icons } from "../../../assets/icons";
import { debounce } from "../../../utils/input";
import Badge from "../../atoms/badge";
import labels from "../../../locale";

const PageHeader = ({
  title = "",
  count = 0,
  badgeTitle = "",
  badgeIcon = null,
  firstBadgeAction = false,
  setFirstBadgeAction = () => {},
  placeholderText = "",
  searchValue = "",
  setSearchValue = () => {},
  extraInputStyle = "",
  rightSideVisible = true,
  filterAndSortByOptions = false,
  hasWriteAccess = false,
  badgeVisible = true,
}) => {
  const handleSearchChange = debounce((value) => {
    setSearchValue(value);
  }, 500);

  return (
    <div className='flex justify-between p-4 items-center gap-5 flex-wrap'>
      <div className='flex gap-6 '>
        <div className='flex items-center gap-5'>
          <h1 className='text-[32px] truncate leading-none font-outfit_semiBold'>
            {title}
          </h1>
        </div>
        <TextInput
          icon={true}
          placeholder={placeholderText}
          searchContainerStyle={
            "w-80 md:w-80 min-w-full !h-[40px] md:min-w-full 2xl:min-w-full"
          }
          extraStyle={`!text-xs ${extraInputStyle}`}
          className={"!text-c_0000005C placeholder:!text-c_0000005C  !text-xs"}
          // value={searchValue}
          isWidthFull={true}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {badgeVisible ? (
        <div className='flex gap-2'>
          <Badge
            title={badgeTitle}
            icon={badgeIcon || Icons?.PlusIcon}
            className='bg-primary text-white !h-10'
            OnClickAction={setFirstBadgeAction}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PageHeader;
