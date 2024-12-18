"use client"
import React, { useEffect, useState } from 'react';
import Project from '../../components/project';  // We'll define this component next
import {RecommendationFormat} from "../types"
import { Home } from 'lucide-react';
import HomeButton from '@/components/HomeButton';
import Recommendation from '@/components/recommendation';

const RecommendationsPage = () => {
  const [recommentations, setRecommendations] = useState<RecommendationFormat[]>([]);

  useEffect(() => {
    // This is where you fetch your projects JSON
    // For now, we'll simulate this with static data
    fetch('./other_data/recommendations.json')  // Adjust path as necessary
      .then(response => response.json())
      .then((data:RecommendationFormat[]) => setRecommendations(data))
      .catch(error => console.error('Error loading the projects:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">Recommendations</h1>
      <div className="flex flex-col justify-center items-center">
        {recommentations.map((recommentation, index) => (
          <Recommendation key={index} {...recommentation}/>
        ))}
      </div>
      <HomeButton />
    </div>
  );
};

export default RecommendationsPage;
