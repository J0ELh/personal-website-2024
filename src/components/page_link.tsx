import Link from 'next/link';
import React from 'react';

type PageLinkProps = {
    name: string;
    redirect: string;
};

const PageLink: React.FC<PageLinkProps> = ({ name, redirect }) => {
    return (
        <Link href={redirect} className="w-1/2 md:min-w-[320px] md:max-w-[450px] flex justify-center items-center text-lg m-2 p-3 bg-gray-300 rounded transition-colors duration-200 ease-in-out hover:bg-gray-400">
            <div >
                {name}
            </div>
        </Link>
    );
};

export default PageLink;
