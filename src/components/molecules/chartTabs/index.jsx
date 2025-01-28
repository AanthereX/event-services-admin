/** @format */

import { Tab, TabGroup, TabList } from "@headlessui/react";
import AnimatedToggleButton from "../../organisms/animatedToggleButton";

const ChartTabs = ({
  filter,
  setFilter = () => {},
  toggleText,
  options,
  isChecked,
  setIsChecked = () => {},
}) => {
  return (
    <div className={"w-auto flex flex-col items-end justify-end gap-2"}>
      <div className={"ml-auto"}>
        <AnimatedToggleButton
          toggleText={toggleText}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      </div>

      <TabGroup>
        <TabList className={"flex bg-c_F5F4F6 rounded-full gap-2"}>
          {options?.map((item, idx) => (
            <Tab
              key={idx}
              className={`rounded-full ${
                item?.value === filter
                  ? "bg-c_primary text-white"
                  : "bg-transparent text-c_5F6165"
              } capitalize h-[27px] px-3 text-fs_13 font-outfit_medium focus:outline-none`}
              onClick={() => setFilter(item?.value)}
            >
              {item?.label}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
};

export default ChartTabs;
