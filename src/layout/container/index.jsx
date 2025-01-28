/** @format */

const Container = ({ className = "", children }) => {
  return (
    <div
      className={`w-full rounded-2xl bg-white h-full min-h-screen ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
