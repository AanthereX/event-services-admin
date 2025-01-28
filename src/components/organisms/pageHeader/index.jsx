/** @format */

import TextInput from "../../atoms/input";
import { Icons } from "../../../assets/icons";
import { debounce } from "../../../utils/input";
import Badge from "../../atoms/badge";
import ServicesRequestTabs from "../servicesRequestTabs";
import Paragraph from "../../atoms/paragraph";
import labels from "../../../locale";
import SelectInput from "../../molecules/selectInputDropdown";
import DateInput from "../../atoms/inputDate";
import Button from "../../atoms/button";
import { useRef } from "react";

const PageHeader = ({
  title = "",
  titleClassName = "",
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
  actions = [],
  selectedTab,
  searchWidthFixed = true,
  setSelectedTab = () => {},
  showTransactionFilterOptions = false,
  paymentStatusOptions = [],
  filter = null,
  setFilter = () => {},
  dateSelected = "",
  setDateSelected = () => {},
  searchBarVisible = true,
  containerClassname = "",
}) => {
  const handleSearchChange = debounce((value) => {
    setSearchValue(value);
  }, 500);
  const { filterBy, paymentStatus, date } = labels;
  const datePickerRef = useRef(null);
  return (
    <div
      className={`flex justify-between px-6 pt-6 items-center gap-5 flex-wrap ${containerClassname}`}
    >
      <div className={"flex md:flex-nowrap flex-wrap gap-4 md:gap-6"}>
        <div className={"flex items-center gap-5"}>
          <h1
            className={`text-fs_32 whitespace-nowrap capitalize leading-none font-outfit_semiBold ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
        {searchBarVisible ? (
          <TextInput
            icon={true}
            placeholder={placeholderText}
            searchContainerStyle={`min-w-full !h-[40px] ${
              !!searchWidthFixed
                ? "md:min-w-[300px] 2xl:min-w-[300px]"
                : "md:min-w-[230px] 2xl:min-w-[230px]"
            }`}
            extraStyle={`!text-xs ${extraInputStyle}`}
            className={
              "!text-black/50 bg-transparent w-full placeholder:!text-black/35 !text-fs_12"
            }
            isWidthFull
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        ) : null}
      </div>

      <div className={"flex gap-2"}>
        {!!actions?.length ? (
          <ServicesRequestTabs actions={actions} selectedTab={selectedTab} />
        ) : badgeVisible ? (
          <Badge
            title={badgeTitle}
            icon={badgeIcon || Icons?.PlusIcon}
            className={"bg-c_primary text-white !h-10"}
            OnClickAction={setFirstBadgeAction}
          />
        ) : null}

        {!!showTransactionFilterOptions && (
          <div
            className={
              "flex flex-wrap items-center justify-start md:justify-center gap-2"
            }
          >
            <div className={"flex items-center justify-center gap-2"}>
              <Paragraph
                className={
                  "font-outfit_medium whitespace-nowrap text-black text-fs_14 leading-[17.6px]"
                }
              >
                {filterBy}
              </Paragraph>
              <DateInput
                ref={datePickerRef}
                value={dateSelected}
                placeholder={date}
                onChange={(date) => {
                  setDateSelected(date);
                }}
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
                datePickerRef={datePickerRef}
              />
            </div>
            <div className={"flex items-center justify-center gap-1"}>
              <SelectInput
                options={paymentStatusOptions}
                isMulti={false}
                placeholder={paymentStatus}
                isOptionDisabled={false}
                onChange={(e) => {
                  setFilter(e);
                }}
                value={filter}
                // error={Boolean(errors.filter)}
                // errorText={errors.filter}
              />
            </div>
            {!!filter ? (
              <Button
                label={null}
                img={Icons.deleteIconRedWithoutBg}
                imgAlt={"deleteicon"}
                className={
                  "!w-4 flex items-center justify-center !h-4 !select-none"
                }
                width={16}
                height={16}
                onClick={() => {
                  setFilter(null);
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
