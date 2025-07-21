"use client";
import React, { useEffect, useState } from "react";
import Project from "../../components/project"; // We'll define this component next
import { PostFormat, ProjectFormat } from "../types";
import { Home } from "lucide-react";
import HomeButton from "@/components/HomeButton";
import Post from "@/components/post";

const AboutMePage = () => {
  const [posts, setPosts] = useState<PostFormat[]>([]);
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    // This is where you fetch your projects JSON
    // For now, we'll simulate this with static data
    fetch(`/other_data/about_me.json`) // Adjust path as necessary
      .then((response) => response.json())
      .then((data: PostFormat[]) => {
        // Sort by the original ISO date string
        data.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
        // Then format the date for display
        const processedData = data.map((post) => ({
          ...post,
          date: formatDate(post.date),
        }));
        setPosts(processedData);
      })
      .catch((error) => console.error("Error loading the projects:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-black">
        About Me
      </h1>
      <div className="flex flex-col justify-center items-center">
        {posts.map((posts, index) => (
          <Post key={index} {...posts} />
        ))}
      </div>
      <HomeButton />
    </div>
  );
};

export default AboutMePage;
