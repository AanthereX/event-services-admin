/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutSideBar from "../LayoutSideBar/index";
import { getUserData } from "../../store/slices/auth.slice";
import Header from "../../components/organisms/header";

const WrapperContainer = ({ children }) => {
  const user = useSelector(getUserData);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollbarActive, setScrollbarActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById("main-container");
    if (container) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className={"bg-white"}>
      <LayoutSideBar
        setSidebarOpen={setSidebarOpen}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      <div className="lg:ml-[calc(288px)] ">
        <div
          className={`w-full relative ${
            scrollbarActive ? "pr-[14px] sm:pr-[22px]" : ""
          } `}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div
          id={"main-container"}
          className={`p-[24px] md:p-[36px] lg:px-[40px] bg-c_FCFCFC relative overflow-x-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WrapperContainer;
