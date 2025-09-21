
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center py-6 md:py-10">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
      Dream Weaver
    </h1>
    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
      Turn any photo into a peaceful dream. Upload an image to see the magic.
    </p>
  </header>
);

export default Header;
