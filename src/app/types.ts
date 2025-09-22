export interface ProjectFormat {
    projectName: string;
    affiliation: string;
    description: string;
    media?: string[];
    technologies?: string[];
    link?: string;
  }

export interface PostFormat {
  date: string;
  postName?: string;
  affiliation?: string;
  caption?: string;
  location?: string;
  media?: string[];
  link?: string;
}

export interface RecommendationFormat {
    affiliation: string;
  }
  
export interface AwardFormat {
  affiliation: string;
  name: string;
}