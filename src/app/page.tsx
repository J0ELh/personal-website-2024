
"use client"
import React from 'react';
import { Linkedin, Github, Mail, Phone, LucideMapPinHouse } from 'lucide-react';  // Adjust based on the actual export names if necessary
import PageLink from '@/components/page_link';
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';
import {DesktopHomepage} from '@/full_page_components/DesktopHomepage';
import { MobileHomePage } from '@/full_page_components/MobileHomePage';



const HomePage = () => {
    const isSmallScreen = useMediaQuery('(max-width: 840px)');
    

// todo, implement phone homepage after i've fixed the formatting issues of this
    return (
        isSmallScreen ?
        <div className='min-h-screen bg-gray-100 p-8 text-'>
            <MobileHomePage/>
        </div> :
        <div >
            <DesktopHomepage/>
        </div>
    );
};

export default HomePage;
