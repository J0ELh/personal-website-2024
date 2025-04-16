import Link from 'next/link';
import React, { useState } from 'react';

// Define a type for the component props
type AwardProps = {
  affiliation: string;
  name: string;
  description?: string;
};

const Award: React.FC<AwardProps> = ({
  affiliation,
  name,
  description
}) => {
  

  return (
    <div className="mx-auto my-3 p-3 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-[600px]">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 relative">
            {name}
        </h2>

        <h2 className="text-xs sm:text-lg font-bold text-gray-500 mb-2">{affiliation}</h2>
        
      </div>
      <h3 className='text-gray-500 text-xs'>{description}</h3>
      



    </div>
  );
};

export default Award;
