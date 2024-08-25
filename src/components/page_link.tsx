// components/PageLink.tsx
import Link from 'next/link';
import React from 'react';

type PageLinkProps = {
    name: string;
    redirect: string;
};

const PageLink: React.FC<PageLinkProps> = ({ name, redirect }) => {
    return (
        <div className='w-1/2  flex justify-center items-center text-lg m-2 p-3 bg-gray-300 rounded transition-colors duration-300 ease-in-out hover:bg-gray-400'>
            <Link href={redirect}>
                {name}
            </Link>
        </div>
    );
};

export default PageLink;
