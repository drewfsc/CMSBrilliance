'use client';

import CMSHeader from '@/components/cms/CMSHeader';

export default function CMSContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CMSHeader title="Content Sections" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-2 text-gray-600">
            Edit hero, about, and other page sections
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Editor</h2>
          <p className="text-gray-600 mb-6">
            Content management functionality coming soon...
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            🚧 Under Development
          </div>
        </div>
      </main>
    </div>
  );
}



