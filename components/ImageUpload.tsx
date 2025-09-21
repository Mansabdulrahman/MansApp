
import React, { useCallback, useState } from 'react';
import { type ImageData } from '../types';
import UploadIcon from './icons/UploadIcon';

interface ImageUploadProps {
  onImageUpload: (imageData: ImageData) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (!base64String) {
          setError('Could not read the image file. Please try another one.');
          return;
        }
        const imageUrl = URL.createObjectURL(file);
        onImageUpload({
          base64: base64String,
          mimeType: file.type,
          url: imageUrl,
        });
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid image file (e.g., PNG, JPG, WEBP).');
    }
  }, [onImageUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
      <label
        htmlFor="file-upload"
        className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-indigo-500 bg-gray-800/50' : 'border-gray-600 hover:border-indigo-500 hover:bg-gray-800/50'
        }`}
      >
        <div 
          className="absolute inset-0"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadIcon />
          <p className="mb-2 text-lg text-gray-400">
            <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleChange} />
      </label>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default ImageUpload;
