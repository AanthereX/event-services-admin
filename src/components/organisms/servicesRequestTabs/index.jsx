/** @format */

import { Fragment } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";

const ServicesRequestTabs = ({ actions = [], selectedTab }) => {
  return (
    <Fragment>
      <TabGroup>
        <TabList className='flex bg-transparent gap-2'>
          {actions?.map((item, idx) => {
            return (
              <Tab
                key={idx}
                className={`w-[90px] rounded-lg ${
                  item?.value === selectedTab
                    ? "bg-gradient-to-r from-g_66A5C4 to-g_66A5C4 text-white"
                    : "bg-transparent border border-c_primary text-c_121212"
                } capitalize h-[40px] text-fs_13 font-outfit_medium focus:outline-none`}
                onClick={item?.action}
              >
                {item?.title}
              </Tab>
            );
          })}
        </TabList>
      </TabGroup>
    </Fragment>
  );
};

export default ServicesRequestTabs;
