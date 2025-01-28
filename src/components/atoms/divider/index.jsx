/** @format */

const Divider = ({ label = null }) => {
  return label ? (
    <>
      <div className='relative w-full'>
        <div className='flex items-center mt-2 mb-6'>
          <div className='w-full border-t border-c_D8D8D8D9' />
          <span className='text-fs_16 uppercase text-c_3C3C43D9 px-4 text-opacity-20 font-outfit_regular'>
            {label}
          </span>
          <div className='w-full border-t border-c_D8D8D8D9' />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className='relative w-full'>
        <div className='flex items-center'>
          <div className='w-full border-t border-black/10' />
        </div>
      </div>
    </>
  );
};

export default Divider;
