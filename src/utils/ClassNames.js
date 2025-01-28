/**
 * Concatenates multiple class names into a single string, removing any falsy values.
 *
 * @param {...string} classes - The class names to concatenate.
 * @return {string} The concatenated class names as a single string.
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { classNames };
