/** @format */

import clsx from "clsx";

const BadgePill = ({
  variant = "primary",
  size = "md",
  label = "",
  className = "",
  rounded = "rounded-full",
  onClick = () => {},
  ...props
}) => {
  const variantClasses = (variant) => {
    switch (variant) {
      case "primary":
        return `bg-primary text-white`;
      case "primary-outline":
        return `border border-primary text-white`;
      case "secondary":
        return `bg-c_5669FF1F text-c_5669FF`;
      case "secondary-outline":
        return `border border-c_5669FF1F text-c_5669FF1F`;
      default:
        return ``;
    }
  };
  const sizeClasses = (size) => {
    switch (size) {
      case "xl":
        return `!min-h-[36px] !text-fs_22 !px-[14px] !py-[14px]`;
      case "lg":
        return `!min-h-[34px] !text-fs_18 !px-[10px] !py-[10px]`;
      case "md":
        return `!min-h-[32px] !text-fs_16 !px-[9px] !py-[9px]`;
      case "sm":
        return `!min-h-[24px] !text-fs_14 !px-[6px] !py-[4px]`;
      case "tiny":
        return `!min-h-[20px] !text-fs_10 !px-[3px] !py-[3px]`;
      default:
        return ``;
    }
  };
  const mergedClasses = clsx(
    `${rounded} flex items-center justify-center outline-none whitespace-nowrap ${sizeClasses(
      size,
    )} ${variantClasses(variant)}`,
  );
  return (
    <div
      onClick={onClick}
      className={`${mergedClasses} ${className}`}
      {...props}
    >
      <span className={"whitespace-nowrap"}>{label}</span>
    </div>
  );
};

export default BadgePill;
