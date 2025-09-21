"use client";
import React, { useEffect, useState } from "react";
import { AwardFormat, RecommendationFormat } from "../types";
import Recommendation from "@/components/recommendation";
import Award from "@/components/award";

const RecommendationsPage = () => {
  const [recommentations, setRecommendations] = useState<
    RecommendationFormat[]
  >([]);
  const [awards, setAwards] = useState<AwardFormat[]>([]);
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  useEffect(() => {
    // This is where you fetch your projects JSON
    // For now, we'll simulate this with static data
    fetch(`/other_data/recommendations.json`) // Adjust path as necessary
      .then((response) => response.json())
      .then((data: RecommendationFormat[]) => setRecommendations(data))
      .catch((error) =>
        console.error("Error loading the recommendations:", error)
      );

    fetch(`/other_data/awards.json`) // Adjust path as necessary
      .then((response) => response.json())
      .then((data: AwardFormat[]) => setAwards(data))
      .catch((error) => console.error("Error loading the awards:", error));
  }, []);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Recommendations
        </h1>
        <div className="flex flex-col justify-center items-center gap-6">
          {recommentations.map((recommendation, index) => (
            <Recommendation key={index} {...recommendation} />
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-8 mt-12 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Awards
        </h1>
        <div className="flex flex-col justify-center items-center gap-6">
          {awards.map((award, index) => (
            <Award key={index} {...award} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
