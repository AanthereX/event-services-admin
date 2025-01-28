/** @format */

import Image from "../image";
import { Icons } from "../../../assets/icons";

/**
 * A component that renders an image or a user circle icon based on the validity of the input URL.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The URL of the image to render.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @return {JSX.Element} The rendered component.
 *
 */
const UserImage = ({
  image,
  className,
  local = false,
  width = 40,
  height = 40,
  ...rest
}) => {
  const { DefaultAvatar } = Icons;
  /**
   * A function that checks if the input URL is valid.
   *
   * @param {string} url - The URL to validate.
   * @return {boolean} Indicates whether the URL is valid.
   */
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return isValidUrl(image) || local ? (
    <Image
      src={image}
      alt={"userImage"}
      width={width}
      height={height}
      className={`object-cover !h-[40px] !w-[40px] object-center resize rounded-full ${className}`}
      {...rest}
    />
  ) : (
    <Image
      src={DefaultAvatar}
      alt={"defaultavatar"}
      width={width}
      height={height}
      className={`!h-[40px] !w-[40px] ${className}`}
    />
  );
};

export default UserImage;
