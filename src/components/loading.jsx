import React from 'react';

const Loading = () => {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
      			<div className="flex items-center space-x-3 animate-fade-in">
        			<img
          				src="/supreme.svg"
          				alt="Supreme Adventures Logo"
          				className="w-12 h-12 animate-pulse"
        			/>
        			<h1 className="text-2xl font-semibold text-gray-800">Supreme Adventures</h1>
      			</div>

      			<div className="mt-6 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      			<p className="mt-4 text-gray-600 text-sm">Loading, please wait...</p>
    		</div>
	);
};

export default Loading;

