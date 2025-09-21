
import React, { useState, useCallback } from 'react';
import { type ImageData } from './types';
import { editImage } from './services/geminiService';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageData: ImageData) => {
    setOriginalImage(imageData);
    setEditedImage(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImage(originalImage.base64, originalImage.mimeType);
      setEditedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleReset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      {isLoading && <Loader />}
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-grow">
        <Header />

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative my-4 shadow-lg" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="flex-grow flex flex-col justify-center">
          {!originalImage ? (
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <div className="flex flex-col items-center gap-8">
              <ImageDisplay originalSrc={originalImage.url} editedSrc={editedImage} />
              <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                >
                  Weave Dream
                </button>
                {editedImage && (
                   <a
                    href={editedImage}
                    download="dream_weaver_edit.png"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                  >
                    Download
                  </a>
                )}
                <button
                  onClick={handleReset}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
