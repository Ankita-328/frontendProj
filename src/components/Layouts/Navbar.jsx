import React from 'react';
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  return (
    <div className='h-16 bg-white border-b border-gray-200/50 shadow-sm backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30'>
      <div className='container flex items-center justify-between'>
        <Link to="/dashboard">
          <h1 className='px-4 md:px-8 md:text-xl font-bold text-lg text-amber-600 leading-5 font-style: italic '>
            PrepWise 
          </h1>
        </Link>
        <div className='mr-15'><ProfileInfoCard /></div>
        
      </div>
    </div>
  );
};

export default Navbar;
