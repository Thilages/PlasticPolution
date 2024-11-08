import React from 'react'

const Navbar = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight, // Scroll to the bottom of the page
      behavior: 'smooth' // Smooth scrolling
    });
  };
  return (
    <div className="flex justify-end mr-10 z-50 relative mt-5 text-white ">
      <div className=" w-1/2 h-64 flex justify-end"> {/* Adjust the width and height as needed */}
        <div onClick={scrollToBottom } className='flex items-center h-10 p-2 text-center justify-center rounded-2xl bg-[#630018] text-white hover:opacity-80 hover:cursor-pointer'>Heat Map</div>

      </div>
    </div>
  )
}

export default Navbar