import { useState } from 'react';
import {
  Image, Type, AlignLeft, Minus, MousePointerClick, Share2, FileText,
  Plus, Heading, Maximize, ChevronUp, ChevronDown, X, GripVertical,
} from 'lucide-react';

const SECTION_CONFIG = [
  { key: 'heroImage', label: 'Hero Image', icon: Image },
  { key: 'header', label: 'Header', icon: Type },
  { key: 'subheading', label: 'Subheading', icon: Type },
  { key: 'bodyText', label: 'Body Text', icon: AlignLeft },
  { key: 'inlineImage', label: 'Inline Image', icon: Image },
  { key: 'divider', label: 'Divider', icon: Minus },
  { key: 'cta', label: 'Call-to-Action', icon: MousePointerClick },
  { key: 'socialLinks', label: 'Social Links', icon: Share2 },
  { key: 'footer', label: 'Footer', icon: FileText },
];

const CUSTOM_SECTION_TYPES = [
  { type: 'text', label: 'Text Block', icon: AlignLeft },
  { type: 'heading', label: 'Heading', icon: Heading },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'divider', label: 'Divider', icon: Minus },
  { type: 'spacer', label: 'Spacer', icon: Maximize },
  { type: 'button', label: 'Button', icon: MousePointerClick },
];

export default function SectionTogglePanel({ state, dispatch }) {
  const [showPicker, setShowPicker] = useState(false);
  const customSections = state.customSections || [];

  const handleAddSection = (sectionType, label) => {
    dispatch({ type: 'ADD_CUSTOM_SECTION', sectionType, title: label });
    setShowPicker(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sections</h3>
      <div className="space-y-1">
        {SECTION_CONFIG.map(({ key, label, icon: Icon }) => {
          const isOn = state.sections[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_SECTION', section: key })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isOn ? 'bg-blue-50 text-blue-900' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </div>
              {/* Toggle switch */}
              <div
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  isOn ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                    isOn ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Add Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Custom Sections</h3>

        {/* Add Section Button */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add Section</span>
        </button>

        {/* Section Type Picker */}
        {showPicker && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {CUSTOM_SECTION_TYPES.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleAddSection(type, label)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Custom Section List */}
        {customSections.length > 0 && (
          <div className="mt-3 space-y-1">
            {customSections.map((section, index) => {
              const typeConfig = CUSTOM_SECTION_TYPES.find(t => t.type === section.type);
              const Icon = typeConfig?.icon || AlignLeft;
              return (
                <div
                  key={section.id}
                  className="flex items-center gap-1 px-2 py-1.5 bg-blue-50 rounded-lg text-sm"
                >
                  <GripVertical className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <Icon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-blue-900 text-xs flex-1 truncate">
                    {section.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REORDER_CUSTOM_SECTION', payload: { id: section.id, direction: 'up' } })}
                    disabled={index === 0}
                    className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REORDER_CUSTOM_SECTION', payload: { id: section.id, direction: 'down' } })}
                    disabled={index === customSections.length - 1}
                    className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REMOVE_CUSTOM_SECTION', payload: section.id })}
                    className="p-0.5 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
