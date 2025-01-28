/** @format */

import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

function ToggleSwitch({
  switchColor = "!bg-c_primary",
  status,
  name,
  onChange = () => {},
  className = "",
  disabled = false,
  label = null,
  onStatusChange = () => {},
}) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(status);
  }, [status]);

  return (
    <div
      className={
        "flex gap-x-[23px] cursor-pointer flex-col rounded-full items-start justify-center gap-3"
      }
    >
      {!!label && (
        <label
          className={"font-outfit_medium text-fs_16 !text-black leading-[14px]"}
        >
          {label}
        </label>
      )}

      <Switch
        name={name}
        checked={enabled}
        onChange={(status) => {
          setEnabled(status);
          onChange && onChange(status);
          onStatusChange();
        }}
        disabled={disabled}
        className={`outline-none rounded-full !w-[36px] !h-[17px] cursor-pointer whitespace-nowrap ${
          !!enabled ? switchColor : "bg-gray-400"
        } ${className}`}
      >
        <span
          aria-hidden={"true"}
          className={`${!!enabled ? "translate-x-[20px]" : "translate-x-[2px]"}
            pointer-events-none block !w-[14px] !h-[13px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
export default ToggleSwitch;
