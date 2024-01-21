import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineDashboardCustomize,
  MdOutlinePerson,
  MdOutlineChat,
  MdOutlineImage,
  MdOutlineViewModule,
  MdOutlineInfo,
  MdOutlineRateReview,
} from 'react-icons/md'; // Import the necessary icons

import img1 from '../../assets/control.png';
import img2 from '../../assets/logo.png';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } bg-[#0F2458] h-full p-5  pt-8 relative duration-300 rounded-r-2xl shadow-lg`}
      >
        <img
          src={img1}
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mb-4">
          <img
            src={img2}
            alt="Logo"
            className={`cursor-pointer duration-500 ${
              open ? 'rotate-[360deg]' : ''
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && 'scale-0'
            }`}
          >
            Books
          </h1>
        </div>

    
        <div className="text-gray-300 hover:text-white pt-3 pb-3 px-4 flex items-center">
          <MdOutlineViewModule className="mr-2" />
          <Link to="/" className="text-lg cursor-pointer">
          Cards
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default Sidebar;
