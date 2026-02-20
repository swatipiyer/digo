import { Check } from 'lucide-react';
import { TEMPLATE_VARIANTS } from '../../data/emailTemplateVariants';

export default function TemplateVariantPicker({ state, dispatch }) {
  const category = TEMPLATE_VARIANTS[state.templateCategory];
  if (!category) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Style</h3>
      <div className="grid grid-cols-3 gap-2">
        {category.variants.map((variant) => {
          const isSelected = state.templateVariant === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => dispatch({ type: 'SET_VARIANT', variantId: variant.id })}
              className={`relative px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-center ${
                isSelected
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              {variant.name}
              {isSelected && (
                <Check className="w-3 h-3 absolute top-1 right-1 text-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
