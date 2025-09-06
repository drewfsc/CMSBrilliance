import React from 'react';
import Image from 'next/image';

const AppLoader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
      <div className="flex justify-center items-center relative cursor-not-allowed scale-75">
        <div className="loader">
          {/* Logo and Percentage stacked vertically */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[9999]">
            {/* Logo on top */}
            <div className="mb-1">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={70} 
                height={70} 
                className="object-contain"
              />
            </div>
            
            {/* Percentage below */}
            <div className="text-white text-2xl font-light before:content-['100%'] before:animate-percent">
            </div>
          </div>
          
          <div className="external-shadow w-56 h-56 rounded-full flex justify-center items-center relative shadow-[0.5em_0.5em_3em_rgb(175,0,166),-0.5em_0.5em_3em_rgb(2,0,141),0.5em_-0.5em_3em_rgb(0,218,18),-0.5em_-0.5em_3em_rgb(0,167,209)] z-[999] animate-rotate bg-black">
            <div className="central flex justify-center items-center relative w-56 h-56 rounded-full shadow-[0.5em_0.5em_3em_rgb(175,0,166),-0.5em_0.5em_3em_rgb(2,0,141),0.5em_-0.5em_3em_rgb(0,218,18),-0.5em_-0.5em_3em_rgb(0,167,209)]">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;