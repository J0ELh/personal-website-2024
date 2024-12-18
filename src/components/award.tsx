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
    <div className="container">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-l font-bold text-gray-900 mb-2 relative">
            {name}
        </h2>

        <h2 className="text-l font-bold text-gray-500 mb-2">{affiliation}</h2>
        
      </div>
      <h3 className='text-gray-500'>{description}</h3>
      



    </div>
  );
};

export default Award;
