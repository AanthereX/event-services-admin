/** @format */

import clsx from "clsx";
import ButtonLoader from "../../loaders/buttonLoader";
import Image from "../image";

const Button = ({
  type = "button",
  label = "",
  btnTextClassName = "text-outfit_regular",
  btnWidth = "w-[412px]",
  buttonContentPosition = "justify-center",
  onClick = () => {},
  isLoading = false,
  className = "",
  size = "md",
  variant = "primaryLight",
  disabled = false,
  spinnerColor = "#fff",
  img = null,
  imgAlt = "",
  imgClassName = "",
  width,
  height,
  Icon = null,
  iconColor = "#C30000",
  iconSize = 24,
  children,
  imageUrl, // New prop for the image URL to download
  ...rest
}) => {
  const sizeClasses = (size) => {
    switch (size) {
      case "tiny":
        return `py-1 text-fs_10 leading-[16px]`;
      case "sm":
        return `py-1 text-fs_13 leading-[16px]`;
      case "md":
        return `py-2.5 text-fs_14 leading-[18px]`;
      case "lg":
        return `py-3 text-fs_16 leading-[18px]`;
      case "xl":
        return `py-3.5 text-fs_16 leading-[18px]`;
      default:
        return "";
    }
  };

  const variantClasses = (variant) => {
    switch (variant) {
      case "primary":
        return `bg-c_primary text-white`;
      case "primary-outline":
        return `bg-c_FFFFFF text-c_primary border border-c_primary`;
      case "secondary-outline":
        return `bg-c_FFFFFF border border-c_primary text-c_121212`;
      case "danger":
        return `bg-c_FF3333 border-none outline-none text-white`;
      default:
        return "";
    }
  };

  const mergedClasses = clsx(
    `w-full rounded-lg ${sizeClasses(size)} ${variantClasses(variant)}`,
  );

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.download = imageUrl.split("/").pop(); // Extract filename from URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      className={`outline-none font-outfit_regular ${mergedClasses} ${className} ${btnWidth} ${
        !!disabled && "opacity-65 cursor-not-allowed"
      }`}
      disabled={isLoading || disabled}
      onClick={imageUrl ? (isLoading ? undefined : handleDownload) : onClick} // Trigger download if not loading
      {...rest}
    >
      {isLoading ? (
        <ButtonLoader color={spinnerColor} />
      ) : (
        <div
          className={`w-full flex flex-row ${buttonContentPosition} gap-x-2 items-center`}
        >
          {children}
          {!!Icon && <Icon color={iconColor} size={iconSize} />}
          {!!img && (
            <Image
              src={img}
              alt={imgAlt}
              className={imgClassName}
              width={width}
              height={height}
              draggable={false}
            />
          )}
          {!!label && <span className={`${btnTextClassName}`}>{label}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
