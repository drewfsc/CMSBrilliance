'use client';

import React, { useState } from 'react';
import { Plus, Trash2, X, ZoomIn } from 'lucide-react';
import { DynamicSection } from '@/lib/dynamic-sections';
import { SectionStylingUtils, useParallaxScroll } from '@/lib/section-styling';

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

interface DynamicGallerySectionProps {
  section: DynamicSection;
  isEditMode?: boolean;
  onUpdate?: (fields: Record<string, any>) => void;
}

const DynamicGallerySection: React.FC<DynamicGallerySectionProps> = ({ section, isEditMode = false, onUpdate }) => {
  const { fields, styling } = section;
  const images = (fields.images as GalleryImage[]) || [];
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Provide fallback styling if not defined
  const fallbackStyling = {
    backgroundColor: 'gray-50',
    textColor: 'auto' as const,
    padding: 'large' as const
  };
  
  const sectionStyling = styling || fallbackStyling;
  const scrollY = useParallaxScroll(sectionStyling.enableParallax || false);
  const { containerStyle, containerClass, backgroundImageStyle } = SectionStylingUtils.getSectionStyles(sectionStyling);

  const handleFieldChange = (fieldName: string, value: any) => {
    if (onUpdate) {
      onUpdate({ ...fields, [fieldName]: value });
    }
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    handleFieldChange('images', newImages);
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      url: '',
      alt: '',
      caption: ''
    };
    handleFieldChange('images', [...images, newImage]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    handleFieldChange('images', newImages);
  };

  const getGridColumns = () => {
    switch (fields.columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '4':
        return 'grid-cols-2 md:grid-cols-4';
      case '5':
        return 'grid-cols-2 md:grid-cols-5';
      default:
        return 'grid-cols-1 md:grid-cols-3';
    }
  };

  return (
    <section 
      id={section.id}
      className={`relative ${containerClass}`}
      style={containerStyle}
    >
      {/* Background Image with Parallax */}
      {backgroundImageStyle && (
        <div
          className="absolute inset-0"
          style={{
            ...backgroundImageStyle,
            transform: sectionStyling.enableParallax 
              ? SectionStylingUtils.getParallaxTransform(scrollY, true)
              : undefined
          }}
        />
      )}
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(fields.title || fields.description || isEditMode) && (
          <div className="text-center mb-12">
            {(fields.title || isEditMode) && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {isEditMode ? (
                  <input
                    type="text"
                    value={fields.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-400"
                    placeholder="Gallery title"
                  />
                ) : (
                  fields.title
                )}
              </h2>
            )}

            {(fields.description || isEditMode) && (
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {isEditMode ? (
                  <textarea
                    value={fields.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-600 dark:text-gray-400 outline-none focus:border-blue-400"
                    placeholder="Gallery description"
                    rows={3}
                  />
                ) : (
                  fields.description
                )}
              </p>
            )}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`grid ${getGridColumns()} gap-6`}>
          {images.map((image, index) => (
            <div key={index} className="group relative">
              {isEditMode && (
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 z-10 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="relative overflow-hidden rounded-lg shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300">
                {image.url ? (
                  <>
                    <img
                      src={image.url}
                      alt={image.alt || 'Gallery image'}
                      className="w-full h-64 object-cover cursor-pointer"
                      onClick={() => fields.enableLightbox && !isEditMode && setLightboxImage(image.url)}
                    />
                    {fields.enableLightbox && !isEditMode && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </>
                ) : isEditMode ? (
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No image</p>
                  </div>
                ) : null}

                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={image.caption}
                          onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded px-2 py-1 text-white outline-none focus:border-blue-400"
                          placeholder="Image caption"
                        />
                      ) : (
                        image.caption
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Edit Mode Image Controls */}
              {isEditMode && (
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={image.url}
                    onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white text-sm"
                    placeholder="Image URL"
                  />
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white text-sm"
                    placeholder="Alt text"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Image Button */}
          {isEditMode && (
            <button
              onClick={addImage}
              className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-neumorphic hover:shadow-neumorphic-hover rounded-lg flex flex-col items-center justify-center transition-all duration-300 border-0"
            >
              <Plus className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">Add Image</span>
            </button>
          )}
        </div>

        {/* Edit Mode Controls */}
        {isEditMode && (
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Columns per Row
                </label>
                <select
                  value={fields.columns || '3'}
                  onChange={(e) => handleFieldChange('columns', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white"
                >
                  <option value="2">2 Columns</option>
                  <option value="3">3 Columns</option>
                  <option value="4">4 Columns</option>
                  <option value="5">5 Columns</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={fields.enableLightbox !== false}
                    onChange={(e) => handleFieldChange('enableLightbox', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Lightbox
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && fields.enableLightbox && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DynamicGallerySection;
