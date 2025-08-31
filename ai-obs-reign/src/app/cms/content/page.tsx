'use client';

import CMSHeader from '@/components/cms/CMSHeader';

export default function CMSContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CMSHeader title="Content Sections" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Edit hero, about, and other page sections
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Content Editor</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Content management functionality coming soon...
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
            🚧 Under Development
          </div>
        </div>
      </main>
    </div>
  );
}



