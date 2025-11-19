import React from 'react';

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-dark-surface border-b border-gray-700/50">
      <div className="container mx-auto px-4 flex items-center justify-center space-x-3">
        <ShieldIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-dark-text-primary tracking-tight">
          Sports Analysis
        </h1>
      </div>
    </header>
  );
};
