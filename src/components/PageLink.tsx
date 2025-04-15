import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import React from 'react';

type PageLinkProps = {
    name: string;
    redirect: string;
};

const PageLink: React.FC<PageLinkProps> = ({ name, redirect }) => {
    const isSmallScreen = useMediaQuery('(max-width: 840px)');
    return (
        isSmallScreen ? 

        <Link href={redirect} className="w-full rounded-xl bg-gray-300 py-3 text-center text-lg font-medium transition hover:bg-gray-400">
            <div >
                {name}
            </div>
        </Link>
        :
        <Link href={redirect} className="w-1/2 md:min-w-[320px] md:max-w-[450px] flex justify-center items-center text-lg m-2 p-3 bg-gray-300 rounded transition-colors duration-200 ease-in-out hover:bg-gray-400">
            <div >
                {name}
            </div>
        </Link>
    );
};

export default PageLink;
