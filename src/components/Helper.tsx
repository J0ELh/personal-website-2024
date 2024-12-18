// components/HomeButton.tsx
import Link from 'next/link';
import React from 'react';
// This is a stub for a component that will be a small question mark beside the back button to tell ppl they can press the links

const Helper: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 p-4 pl-6 pr-6 bg-gray-500 rounded-md m-4 hover:bg-blue-500 transition-colors duration-300">
            <Link href={"/"}>
                Back
            </Link>
        </div>
    );
};

export default Helper;
