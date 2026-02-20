import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, ChevronDown, ChevronRight } from 'lucide-react';
import { FONT_FAMILIES } from '../../data/fontFamilies';

function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {title}
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && <div className="pb-3 space-y-3">{children}</div>}
    </div>
  );
}

function SliderControl({ label, value, min, max, step = 1, unit = 'px', onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className="text-xs font-mono text-gray-500">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}

export default function DesignControlsPanel({ state, dispatch }) {
  const { typography, spacing, borderRadius } = state.design;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Design</h3>

      <CollapsibleSection title="Typography" defaultOpen={true}>
        {/* Font Family */}
        <div>
          <label className="text-xs text-gray-600 block mb-1">Font Family</label>
          <select
            value={typography.fontFamily}
            onChange={(e) => dispatch({ type: 'UPDATE_TYPOGRAPHY', payload: { fontFamily: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font.id} value={font.id}>{font.name}</option>
            ))}
          </select>
        </div>

        {/* Heading Size */}
        <SliderControl
          label="Heading Size"
          value={typography.headingSize}
          min={18}
          max={42}
          onChange={(v) => dispatch({ type: 'UPDATE_TYPOGRAPHY', payload: { headingSize: v } })}
        />

        {/* Body Size */}
        <SliderControl
          label="Body Size"
          value={typography.bodySize}
          min={12}
          max={20}
          onChange={(v) => dispatch({ type: 'UPDATE_TYPOGRAPHY', payload: { bodySize: v } })}
        />

        {/* Text Alignment */}
        <div>
          <span className="text-xs text-gray-600 block mb-1">Text Alignment</span>
          <div className="flex gap-1">
            {[
              { value: 'left', icon: AlignLeft },
              { value: 'center', icon: AlignCenter },
              { value: 'right', icon: AlignRight },
            ].map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => dispatch({ type: 'UPDATE_TYPOGRAPHY', payload: { textAlign: value } })}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                  typography.textAlign === value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Spacing">
        <SliderControl
          label="Content Padding"
          value={spacing.contentPadding}
          min={16}
          max={64}
          onChange={(v) => dispatch({ type: 'UPDATE_SPACING', payload: { contentPadding: v } })}
        />
        <SliderControl
          label="Section Gap"
          value={spacing.sectionGap}
          min={8}
          max={48}
          onChange={(v) => dispatch({ type: 'UPDATE_SPACING', payload: { sectionGap: v } })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Shape">
        <SliderControl
          label="Border Radius"
          value={borderRadius}
          min={0}
          max={24}
          onChange={(v) => dispatch({ type: 'UPDATE_BORDER_RADIUS', value: v })}
        />

        {/* CTA Button Style */}
        <div>
          <span className="text-xs text-gray-600 block mb-1">Button Style</span>
          <div className="flex gap-1">
            {[
              { value: 'rounded', label: 'Rounded' },
              { value: 'pill', label: 'Pill' },
              { value: 'square', label: 'Square' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => dispatch({ type: 'UPDATE_CTA_STYLE', value })}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                  state.design.ctaStyle === value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Header Style */}
        <div>
          <span className="text-xs text-gray-600 block mb-1">Header Style</span>
          <div className="flex gap-1">
            {[
              { value: 'solid-color', label: 'Solid' },
              { value: 'gradient', label: 'Gradient' },
              { value: 'none', label: 'None' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => dispatch({ type: 'UPDATE_HEADER_STYLE', value })}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                  state.design.headerStyle === value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
