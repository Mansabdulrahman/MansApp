
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="text-white text-2xl font-semibold mt-8">Weaving your dream...</p>
      <p className="text-gray-400 mt-2">The AI is working its magic. This might take a moment.</p>
    </div>
  );
};

export default Loader;
