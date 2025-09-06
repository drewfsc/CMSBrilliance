'use client';

import React from 'react';
import { DynamicSection } from '@/lib/dynamic-sections';
import { SectionStylingUtils, useParallaxScroll } from '@/lib/section-styling';

interface DynamicDividerSectionProps {
  section: DynamicSection;
  isEditMode?: boolean;
  onUpdate?: (fields: Record<string, any>) => void;
}

const DynamicDividerSection: React.FC<DynamicDividerSectionProps> = ({ section, isEditMode = false, onUpdate }) => {
  const { fields, styling } = section;
  
  // Provide fallback styling if not defined
  const fallbackStyling = {
    backgroundColor: 'white',
    textColor: 'auto' as const,
    padding: 'small' as const
  };
  
  const sectionStyling = styling || fallbackStyling;
  const scrollY = useParallaxScroll(sectionStyling.enableParallax || false);
  const { containerStyle, containerClass, backgroundImageStyle } = SectionStylingUtils.getSectionStyles(sectionStyling);

  const handleFieldChange = (fieldName: string, value: any) => {
    if (onUpdate) {
      onUpdate({ ...fields, [fieldName]: value });
    }
  };

  const getAlignmentClass = () => {
    switch (fields.alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  const getLineStyleClass = () => {
    switch (fields.lineStyle) {
      case 'dashed':
        return 'border-dashed';
      case 'dotted':
        return 'border-dotted';
      default:
        return 'border-solid';
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
        <div className={`flex items-center ${getAlignmentClass()}`}>
          {/* Left Line */}
          {fields.showLine && fields.alignment !== 'left' && (
            <div className={`flex-1 border-t border-gray-300 dark:border-gray-600 ${getLineStyleClass()}`}></div>
          )}
          
          {/* Text Content */}
          {(fields.text || isEditMode) && (
            <div className="px-6">
              {isEditMode ? (
                <input
                  type="text"
                  value={fields.text || ''}
                  onChange={(e) => handleFieldChange('text', e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-400"
                  placeholder="Divider text (optional)"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
                  {fields.text}
                </span>
              )}
            </div>
          )}
          
          {/* Right Line */}
          {fields.showLine && fields.alignment !== 'right' && (
            <div className={`flex-1 border-t border-gray-300 dark:border-gray-600 ${getLineStyleClass()}`}></div>
          )}
        </div>

        {/* Edit Mode Controls */}
        {isEditMode && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Alignment
                </label>
                <select
                  value={fields.alignment || 'center'}
                  onChange={(e) => handleFieldChange('alignment', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Line Style
                </label>
                <select
                  value={fields.lineStyle || 'solid'}
                  onChange={(e) => handleFieldChange('lineStyle', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white"
                  disabled={!fields.showLine}
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={fields.showLine !== false}
                    onChange={(e) => handleFieldChange('showLine', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Divider Line
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicDividerSection;
