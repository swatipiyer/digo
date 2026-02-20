import { Palette } from 'lucide-react';
import { COLOR_PRESETS } from '../../data/emailTemplateVariants';

const COLOR_FIELDS = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent / CTA' },
  { key: 'background', label: 'Background' },
  { key: 'text', label: 'Text' },
  { key: 'headerBackground', label: 'Header BG' },
  { key: 'footerBackground', label: 'Footer BG' },
];

export default function ColorPaletteEditor({ state, dispatch }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Palette className="w-3.5 h-3.5" />
        Colors
      </h3>

      {/* Preset Palettes */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Quick presets</p>
        <div className="flex gap-2 flex-wrap">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => dispatch({ type: 'SET_COLOR_PRESET', colors: preset.colors })}
              className="group relative"
              title={preset.name}
            >
              <div className="flex rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                <div className="w-5 h-8" style={{ backgroundColor: preset.colors.primary }} />
                <div className="w-5 h-8" style={{ backgroundColor: preset.colors.accent }} />
                <div className="w-5 h-8" style={{ backgroundColor: preset.colors.background }} />
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Individual Color Pickers */}
      <div className="space-y-2 mt-6">
        {COLOR_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="color"
              value={state.design.colors[key]}
              onChange={(e) => dispatch({ type: 'UPDATE_COLOR', key, value: e.target.value })}
              className="w-8 h-7 border border-gray-200 rounded cursor-pointer flex-shrink-0"
            />
            <label className="text-xs text-gray-600 w-20 flex-shrink-0">{label}</label>
            <input
              type="text"
              value={state.design.colors[key]}
              onChange={(e) => dispatch({ type: 'UPDATE_COLOR', key, value: e.target.value })}
              className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
