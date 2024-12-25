import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">Oops! Page not found</h2>
        <p className="text-sm md:text-base mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="btn btn-outline btn-white"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
