"use client"
import React, { useEffect, useState } from 'react';
import Project from '../../components/project';  // We'll define this component next
import {ProjectFormat} from "../types"

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectFormat[]>([]);

  useEffect(() => {
    // This is where you fetch your projects JSON
    // For now, we'll simulate this with static data
    fetch('./other_data/project_info.json')  // Adjust path as necessary
      .then(response => response.json())
      .then((data:ProjectFormat[]) => setProjects(data))
      .catch(error => console.error('Error loading the projects:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-8 text-">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">My Projects</h1>
      <div className="flex flex-wrap justify-center items-start">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
