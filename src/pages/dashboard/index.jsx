/** @format */

import { useCallback, useEffect, useState } from "react";
import labels from "../../locale";
import DashboardCard from "../../components/organisms/dashboardCard";
import DashboardChart from "../../components/organisms/dashboardChart";
import DashboardTable from "../../components/organisms/tables/dashboardTable";
import Heading from "../../components/atoms/heading";
import {
  useLazyGetAllDashboardDataQuery,
  useLazyGetAllUpcomingEventsQuery,
} from "../../services/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartData,
  getDashboardData,
  getPageData,
  getUpcomingEventDataList,
  setChartData,
  setDashboardData,
  setUpcomingEvents,
} from "../../store/slices/dashboard.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(getDashboardData);
  const upcommingEvents = useSelector(getUpcomingEventDataList);
  const pageData = useSelector(getPageData);
  const chartData = useSelector(getChartData);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  const [filter, setFilter] = useState("weekly");
  const [count, setCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [getAllDashboardData, { isLoading, isFetching, isError }] =
    useLazyGetAllDashboardDataQuery();
  const [
    getAllUpcomingEvents,
    {
      isLoading: loadingGetAllEvents,
      isFetching: isFetchingGetAllEvents,
      isError: isErrorGetAllEvents,
    },
  ] = useLazyGetAllUpcomingEventsQuery();

  const handlerGetAllDashboardData = useCallback(async (_type, _filter) => {
    setLoading(true);
    try {
      const response = await getAllDashboardData({
        type: _type ? "service" : "venue",
        filter: _filter,
      }).unwrap();
      if (!response?.data) return;
      const {
        totalEvents,
        currentWeekTotalEvent,
        previousWeekEvents,
        totalUser,
        currentWeekTotalUser,
        previousWeekUser,
        totalVendor,
        currentWeekVendor,
        pastWeekVendor,
        ...rest
      } = response.data;
      dispatch(
        setDashboardData({
          data: {
            totalEvents,
            currentWeekTotalEvent,
            previousWeekEvents,
            totalUser,
            currentWeekTotalUser,
            previousWeekUser,
            totalVendor,
            currentWeekVendor,
            pastWeekVendor,
          },
        }),
      );
      dispatch(
        setChartData({
          data: rest,
        }),
      );
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handlerGetAllDashboardData(isChecked, filter);
  }, [isChecked, filter]);

  const getAllLatestEvents = useCallback(async (page) => {
    setLoader(true);
    try {
      const response = await getAllUpcomingEvents({
        page,
      }).unwrap();
      if (!response) return;
      setEvents(response.data?.event);
      setCount(response.data?.count);
      dispatch(
        setUpcomingEvents({
          data: response.data?.event,
          meta: {
            totalItems: response.data?.count,
            itemCount: response.data?.count,
            itemsPerPage: 10,
            totalPages:
              (response.data?.count / 10) % 1 !== 0
                ? parseInt(response.data?.count / 10) + 1
                : parseInt(response.data?.count / 10),
            currentPage: page,
          },
        }),
      );
    } catch (error) {
      console.log(error?.data?.message);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getAllLatestEvents(1);
  }, []);

  return (
    <section className={"w-full"}>
      <div
        className={
          "upper-section w-full grid grid-cols-12 gap-4 md:gap-3 lg:gap-3 xl:gap-0 2xl:gap-3 mb-[30px]"
        }
      >
        <div
          className={
            "cards-section w-full flex flex-wrap gap-x-4 xl:gap-y-0 gap-y-4 col-span-12 md:col-span-4 lg:col-span-12 xl:col-span-6 2xl:col-span-6"
          }
        >
          {dashboardData?.map((item, idx) => {
            return (
              <DashboardCard
                uniqKey={idx}
                count={item?.count}
                title={item?.title}
                isProfit={item?.isProfit}
                value={item?.value === "0.00%" ? null : item?.value}
                bgColor={item?.bgColor}
              />
            );
          })}
        </div>
        <div
          className={
            "graph-section col-span-12 md:col-span-8 lg:col-span-12 xl:col-span-6 2xl:col-span-6"
          }
        >
          <DashboardChart
            loading={loading}
            chartData={chartData}
            filter={filter}
            setFilter={setFilter}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
      </div>

      <div className={"lower-section bg-white w-full rounded-2xl"}>
        <Heading
          className={
            "font-outfit_medium capitalize text-left pl-[30px] pb-[18px] pt-[24px] text-black text-fs_22 md:text-fs_24 leading-[30px]"
          }
        >
          {labels.upcomingEvents}
        </Heading>
        <DashboardTable
          pageData={pageData}
          loading={loader}
          setLoading={setLoader}
          events={upcommingEvents}
          setEvents={setEvents}
          count={count}
          setCount={setCount}
          getData={getAllLatestEvents}
        />
      </div>
    </section>
  );
};

export default Dashboard;
