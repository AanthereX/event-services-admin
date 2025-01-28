/** @format */

/**
 * Renders a heading element with specified styling and children.
 *
 * @param {object} children - The content to display inside the heading.
 * @param {string} className - Additional classes for styling the heading.
 * @return {JSX.Element} The heading element with specified styling and content.
 */
const Heading = ({ children, className = "", ...rest }) => {
  return (
    <h6
      className={`font-outfit_semiBold text-start text-fs_16 md:text-fs_18 leading-[32px] text-black ${className}`}
      {...rest}
    >
      {children}
    </h6>
  );
};

export default Heading;
