import React from 'react';
import { Linkedin, Github, Mail, Phone, LucideMapPinHouse } from 'lucide-react';  // Adjust based on the actual export names if necessary
import PageLink from '@/components/page_link';


const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-200 p-8 flex text-black">
            <div className="w-3/10 flex flex-col border-r-2 border-gray-400 pr-8"> {/* Added border and padding */}
                <div className=''>
                  <div className='items-center text-center mb-3'>
                    <img
                        src=".\images\joel_pf.jpg"
                        alt="Profile Photo"
                        className="w-64 h-64 rounded-full mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-2">Joel Hempel</h1>
                  </div>
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
            </div>
            <div className="w-7/10 pl-8">
                <div className="content">
                    <h2 className='mt-3 mb-6 text-2xl text-blue-500 '>Hi there!</h2>
                    <h3 className='text-xl mb-6'>Welcome to my personal website 👋</h3>
                    <p>
                        I'm currently in my final year at the University of British Columbia, where I'm studying Computer Science. Here you'll find a glimpse into my academic and project experiences, as well as my personal interests. Feel free to navigate through the sections below to learn more about my journey and the work I'm passionate about.
                    </p>
                </div>
                
                <nav className="flex justify-center items-center flex-col mt-10">
                    <PageLink name={'Experience (Resume)'} redirect={'experience'}/>
                    <PageLink name={'Projects'} redirect={'projects'}/>
                    <PageLink name={'About Me'} redirect={'about'}/>
                </nav>
            </div>
        </div>
    );
};

export default HomePage;
