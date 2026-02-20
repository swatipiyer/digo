import { useState } from 'react';
import { Check } from 'lucide-react';
import { TEMPLATE_VARIANTS } from '../../data/emailTemplateVariants';
import { initialEmailState } from '../../hooks/useEmailBuilder';
import EnhancedEmailPreview from '../EnhancedEmailPreview';

function MiniPreview({ category, variant }) {
  const previewState = {
    ...initialEmailState,
    templateCategory: category.id,
    templateVariant: variant.id,
    content: {
      heading: 'Event Title Here',
      subheading: 'A short description',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      ctaText: category.defaultContent.ctaText || 'Learn More',
      ctaUrl: '#',
    },
    sections: { ...variant.defaultSections },
    branding: { organizationName: 'Your Brand' },
    design: {
      ...initialEmailState.design,
      headerStyle: variant.defaultDesign.headerStyle,
      ctaStyle: variant.defaultDesign.ctaStyle,
      footerStyle: variant.defaultDesign.footerStyle,
      layout: variant.defaultDesign.bodyLayout,
    },
  };

  return (
    <div style={{ width: '600px', pointerEvents: 'none' }}>
      <EnhancedEmailPreview state={previewState} />
    </div>
  );
}

export default function TemplateGallery({ state, dispatch, onSelect }) {
  const [activeCategory, setActiveCategory] = useState(state.templateCategory);
  const categories = Object.values(TEMPLATE_VARIANTS);
  const currentCategory = TEMPLATE_VARIANTS[activeCategory];

  const handleSelectVariant = (categoryId, variantId) => {
    dispatch({ type: 'SET_TEMPLATE', category: categoryId, variantId });
    onSelect?.();
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Variant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentCategory.variants.map((variant) => {
          const isSelected = state.templateVariant === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => handleSelectVariant(activeCategory, variant.id)}
              className={`relative bg-white border-2 rounded-xl overflow-hidden text-left transition-all hover:shadow-lg group ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Mini Preview */}
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <div style={{ transform: 'scale(0.32)', transformOrigin: 'top left', width: '600px' }}>
                  <MiniPreview category={currentCategory} variant={variant} />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Label */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{variant.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{variant.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
