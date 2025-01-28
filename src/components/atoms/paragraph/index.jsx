/** @format */

import { cn } from "../../../utils";

/**
 * Renders a paragraph element with specified styling and children.
 *
 * @param {object} children - The content to display inside the paragraph.
 * @param {string} className - Additional classes for styling the paragraph.
 * @return {JSX.Element} The paragraph element with specified styling and content.
 */

const Paragraph = ({ className = "", children, ...rest }) => {
  return (
    <p
      className={cn(
        `font-outfit_regular text-start md:text-fs_16 text-fs_14 leading-[20px]`,
        `${className}`,
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Paragraph;
