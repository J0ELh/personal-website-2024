"use client"
import { useState, useEffect } from 'react';

export default function usePostInfo() {
    // NOTE: The previewThreshold MUST be greater than the previewLength
    const previewLength = 100;
    const previewThreshold = 200;

  
    return { previewLength, previewThreshold };
}
  
