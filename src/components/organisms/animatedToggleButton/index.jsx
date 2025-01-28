/** @format */

import VenuesIcon from "../../../assets/icons/VenuesIcon";
import EventServicesIcon from "../../../assets/icons/EventServicesIcon";

const ToggleButton = ({
  isChecked,
  setIsChecked = () => {},
  color = "bg-c_66A5C4",
  toggleText = "",
}) => {
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <label className="relative inline-block w-[120px] h-[30px] cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={handleToggle}
        />
        {/* Background Slider */}
        <span
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isChecked ? color : "bg-c_F5F4F6"
          }`}
        ></span>
        {/* Text */}
        <span
          className={`absolute top-[50%] left-[60%] transform -translate-x-1/2 -translate-y-1/2  font-semibold text-sm transition-all duration-500 ${
            isChecked ? "left-[35%] text-white" : "left-[60%] text-c_404040"
          }`}
        >
          {toggleText}
        </span>
        {/* Ball */}
        <span
          className={`absolute top-1 left-1 h-[22px] w-[36px] ${
            isChecked ? "bg-white" : "bg-c_66A5C4"
          } rounded-full shadow-md transition-all duration-500 transform ${
            isChecked ? "translate-x-[210%] rotate-[360deg]" : "translate-x-0"
          }`}
        >
          {/* Icon */}
          <span
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isChecked ? "text-c_66A5C4" : "text-c_3C3C43D9"
            }`}
          >
            {isChecked ? (
              <EventServicesIcon
                color={!!isChecked && "#66A5C4"}
                width={16}
                height={16}
              />
            ) : (
              <VenuesIcon
                color={!isChecked && "#FFFFFF"}
                width={16}
                height={16}
              />
            )}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ToggleButton;
