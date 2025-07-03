"use client";
import React, { useEffect, useState } from "react";
import Project from "../../components/project";
import { ProjectFormat } from "../types";
import HomeButton from "@/components/HomeButton";

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-black">
        My Projects
      </h1>
      <div className="flex flex-col items-center">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
      <HomeButton />
    </div>
  );
};

export default ProjectsPage;
