import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete
}) => {
  return (
    <div
      className="rounded-xl border border-gray-200 bg-white overflow:hidden hover:shadow-xl shadow-gray-100 relative group p-2 transition cursor-pointer"
      onClick={onSelect}
    >
      <div
        className="p-4 rounded-lg relative cursor-pointer"
        style={{ background: colors.bgcolor }} 
      >
        {/* Avatar initials */}
        <div className="flex items-start">
          <div className='flex-shrink-0  w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4'>
          <span className='text-lg font-semibold text-black'>{getInitials(role)}</span>
        </div>

        {/* Title and skills */}
        <div className="flex-grow">
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-[17px] font-medium">{role}</h2>
                    <p className="text-medium text-xs text-gray-900">{topicsToFocus}</p>
                </div>
            </div>
        </div>
      </div>

      <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hpver:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2/>
        </button>
        </div>

      {/* Metadata row */}
      <div className='px-3 pb-3'>
        <div className='flex items-center gap-3 mt-4 '>
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            {questions} Q&A
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>
         <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">{description}</p>
      </div>
      

      
    </div>
  );
};

export default SummaryCard;

