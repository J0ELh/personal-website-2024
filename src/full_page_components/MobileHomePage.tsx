import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import useDeploymentContext from '@/hooks/useDeploymentContext';
import PageLink from '@/components/page_link';
import { Github, Linkedin, LucideMapPinHouse, Mail, Phone } from 'lucide-react';

export const MobileHomePage = () => {
    const basePath = useDeploymentContext();
  
    return (
      <div className="min-h-screen bg-gray-200 p-4 flex flex-col text-black">
        <div className="flex flex-row items-center justify-between">
  {/* Profile Section */}
  <div className="flex flex-col items-center">
    <Image
      src={`${basePath}/images/joel_pf_lower_res.jpg`}
      alt="Profile Photo"
      width={256}
      height={256}
      className="rounded-full object-cover mb-4"
      style={{ width: '10rem', height: '10rem' }}
    />
    <h1 className="text-2xl font-bold">Joel Hempel</h1>
    </div>

    {/* Contact Information */}
    <div id="contact" className="text-right">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <ul className="flex flex-col items-end space-y-2">
        <li className="flex items-center gap-2">
            <Linkedin />
            <a
            href="https://www.linkedin.com/in/joelhempel"
            className="text-blue-500 hover:text-blue-700"
            >
            LinkedIn
            </a>
        </li>
        <li className="flex items-center gap-2">
            <Github />
            <a
            href="https://github.com/J0ELh"
            className="text-blue-500 hover:text-blue-700"
            >
            GitHub
            </a>
        </li>
        <li className="flex items-center gap-2">
            <Mail />
            <span className="cursor-pointer hover:text-blue-700">
            joelhempel35@gmail.com
            </span>
        </li>
        <li className="flex items-center gap-2">
            <Phone />
            <span className="cursor-pointer hover:text-blue-700">
            (778) 988-3112
            </span>
        </li>
        <li className="flex items-center gap-2">
            <LucideMapPinHouse />
            <span>Vancouver, BC (Canada)</span>
        </li>
        </ul>
    </div>
    </div>

  
        {/* Introduction and Content */}
        <div className="content mt-8 px-4">
          <h2 className="text-2xl text-blue-500 mb-4 text-center">Hi there!</h2>
          <h3 className="text-xl mb-4 text-center">Welcome to my personal website 👋</h3>
          <p className="text-center">
            I’m currently in my final year at the University of British Columbia, where I’m studying Computer Science. Here you’ll find a glimpse into my academic and project experiences, as well as my personal interests. Feel free to navigate through the sections below to learn more about my journey and the work I’m passionate about.
          </p>
        </div>
  
        {/* Navigation Links */}
        <nav className="mt-8 flex flex-col items-center space-y-4">
          <a
            href={`${basePath}/other_data/Joel_Hempel_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center items-center text-lg p-3 bg-gray-300 rounded transition-colors duration-200 hover:bg-gray-400"
          >
            Experience (Resume)
          </a>
          <PageLink name="Projects" redirect="projects" />
          <PageLink name="Recommendations and Awards" redirect="recommendations_awards" />
          <PageLink name="About Me" redirect="about" />
        </nav>
      </div>
    );
  };
  