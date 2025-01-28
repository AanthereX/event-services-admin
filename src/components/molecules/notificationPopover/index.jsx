/** @format */
import HeadlessPopover from "../headlessPopover";
import labels from "../../../locale";
import Button from "../../atoms/button";

const NotificationPopover = ({ button }) => {
  const { notifications, viewAll, noNotifications } = labels;
  return (
    <HeadlessPopover button={button}>
      <div className='overflow-hidden rounded-3xl shadow-lg'>
        <div className='grid lg:grid-cols-1 z-[99]'>
          <div
            className={`col-span-1 flex justify-between items-center bg-primary px-6 py-[20px]`}
          >
            <span className='text-fs_16 font-outfit_medium tracking-[0.05rem] text-c_F8F8F8'>
              {`${notifications}`}
            </span>
            <div>
              <Button
                variant={"none"}
                size={"none"}
                label={viewAll}
                className={
                  "text-fs_10 uppercase font-outfit_medium tracking-[0.05rem] text-c_F8F8F8 cursor-pointer"
                }
              />
            </div>
          </div>

          <div className={"col-span-1 bg-white px-5 py-[18px]"}>
            <div
              className={"w-full h-fit flex items-center justify-center p-5"}
            >
              <p
                className={
                  "text-c_848484 font-outfit_regular text-fs_16 leading-8"
                }
              >
                {noNotifications}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeadlessPopover>
  );
};

export default NotificationPopover;
