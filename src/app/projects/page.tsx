"use client";
import React, { useEffect, useState } from "react";
import Project from "../../components/project";
import { ProjectFormat } from "../types";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectFormat[]>([]);
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  useEffect(() => {
    fetch(`/other_data/project_info.json`)
      .then((response) => response.json())
      .then((data: ProjectFormat[]) => setProjects(data))
      .catch((error) => console.error("Error loading the projects:", error));
  }, []);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          My Projects
        </h1>
        <div className="flex flex-col items-center gap-6">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
