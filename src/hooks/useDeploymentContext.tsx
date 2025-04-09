"use client"
import { useState, useEffect } from 'react';


export default function useDeploymentContext() {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/personal-website-2024' : '';

    

  return basePath;
}
