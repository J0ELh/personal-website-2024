import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import useDeploymentContext from '@/hooks/useDeploymentContext';
import PageLink from '@/components/page_link';
import { Github, Linkedin, LucideMapPinHouse, Mail, Phone } from 'lucide-react';


export const DesktopHomepage = () => {
    const basePath = useDeploymentContext();

    return (
        <div className="min-h-screen bg-gray-200 p-8 flex text-black">
          {/* left column */}
          <div className="basis-[30%] flex flex-col border-r-2 border-gray-400 pr-8">
            <div className="flex justify-center mb-3">
              <Image
                src={`${basePath}/images/joel_pf_lower_res.jpg`}
                alt="Profile Photo"
                width={256}
                height={256}
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
    
            <h1 className="text-2xl font-bold mb-2">Joel Hempel</h1>
                
                <div id="contact" className="contact-info mt-8">
                    <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                    <ul className="mb-2">
                        <li className="mb-2 flex flex-row gap-3">
                            <Linkedin />
                            <a href="https://www.linkedin.com/in/joelhempel" className="text-blue-500 hover:text-blue-700  ">
                                LinkedIn
                            </a>
                        </li>
                        <li className="mb-2 flex flex-row gap-3">
                            <Github />
                            <a href="https://github.com/J0ELh" className="text-blue-500 hover:text-blue-700  ">
                                GitHub
                            </a>
                        </li>
                        <li className="mb-2 flex flex-row gap-3">
                            <Mail />
                            <span id="email" className="cursor-pointer hover:text-blue-700">joelhempel35@gmail.com</span>
                        </li>
                        <li className="mb-2 flex flex-row gap-3">
                            <Phone />
                            <span id="phone" className="cursor-pointer hover:text-blue-700">(778) 988-3112</span>
                        </li>
                        <li className="mb-2 flex flex-row gap-3">
                            <LucideMapPinHouse />
                            Vancouver, BC (Canada)
                        </li>
                    </ul>
                </div>
            </div>
            {/* right column */}
            <div className="basis-[70%] pl-8">
                <div className="content">
                    <h2 className='mt-3 mb-6 text-2xl text-blue-500 '>Hi there!</h2>
                    <h3 className='text-xl mb-6'>Welcome to my personal website 👋</h3>
                    <p>
                        I&#39;m currently in my final year at the University of British Columbia, where I&#39;m studying Computer Science. Here you&#39;ll find a glimpse into my academic and project experiences, as well as my personal interests. Feel free to navigate through the sections below to learn more about my journey and the work I&#39;m passionate about.
                    </p>
                </div>

                <nav className="flex justify-center items-center flex-col mt-10">
          <a
            href={`${basePath}/other_data/Joel_Hempel_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 flex justify-center items-center text-lg m-2 p-3
                       bg-gray-300 rounded transition-colors duration-300 ease-in-out
                       hover:bg-gray-400"
          >
            Experience&nbsp;(Resume)
          </a>

          <PageLink name="Projects" redirect="projects" />
          <PageLink name="Recommendations and Awards" redirect="recommendations_awards" />
          <PageLink name="About Me" redirect="about" />
        </nav>
      </div>
    </div>
  );
};