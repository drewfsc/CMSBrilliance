'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LogOut, ArrowLeft } from 'lucide-react';

interface CMSHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const CMSHeader: React.FC<CMSHeaderProps> = ({ title, showBackButton = false }) => {
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                href="/cms/dashboard"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            )}
            
            <Link href="/cms/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CMS</span>
            </Link>
            
            <span className="text-gray-500">|</span>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Link>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CMSHeader;
