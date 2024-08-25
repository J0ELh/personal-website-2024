import React, { useState } from 'react';

const Project = ({ projectName, affiliation, description }: { projectName: string, affiliation: string, description: string }) => {
  // State to manage visibility of the full description
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the state
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Define a maximum length for the preview
  const previewLength = 100;

  return (
    <div className="m-4 p-4 w-1/3 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold text-gray-500 mb-2">{projectName}</h2>
      <h3 className="text-md text-blue-500">{affiliation}</h3>
      {isExpanded || description.length <= previewLength ? (
        <p className="text-gray-900">{description}</p>
      ) : (
        <p className="text-gray-900">{description.substring(0, previewLength)}...</p>
      )}
      {description.length > previewLength && (
        <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default Project;
