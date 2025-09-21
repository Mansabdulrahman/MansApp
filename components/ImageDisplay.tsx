
import React from 'react';

interface ImageDisplayProps {
  originalSrc: string;
  editedSrc: string | null;
}

const ImageCard: React.FC<{ src: string | null; title: string; isLoading?: boolean }> = ({ src, title, isLoading }) => (
  <div className="w-full md:w-1/2 flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-xl shadow-lg transition-all duration-300">
    <h3 className="text-xl font-bold text-gray-300">{title}</h3>
    <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400"></div>
      ) : src ? (
        <img src={src} alt={title} className="w-full h-full object-contain" />
      ) : (
        <div className="text-gray-500">Your image will appear here</div>
      )}
    </div>
  </div>
);


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalSrc, editedSrc }) => {
  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8">
      <ImageCard src={originalSrc} title="Original Photo" />
      <ImageCard src={editedSrc} title="Dream Edit" isLoading={!editedSrc && originalSrc !== null} />
    </div>
  );
};

export default ImageDisplay;
