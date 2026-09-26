import React from 'react'
import { Link } from 'react-router-dom';

function NA() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6 text-gray-800">
      <h1 className="text-8xl font-bold tracking-tight text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-500 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
        <Link
          to="/collection"
          className="px-6 py-2.5 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          View Collection
        </Link>
      </div>
    </div>
  );
}

export default NA