const LAYOUTS = [
  {
    id: 'single-column',
    name: 'Single Column',
    wireframe: (
      <div className="space-y-1">
        <div className="h-3 bg-current rounded-sm opacity-30" />
        <div className="h-8 bg-current rounded-sm opacity-15" />
        <div className="h-2 bg-current rounded-sm opacity-20 w-1/2 mx-auto" />
      </div>
    ),
  },
  {
    id: 'full-width-hero',
    name: 'Full Hero',
    wireframe: (
      <div className="space-y-1">
        <div className="h-5 bg-current rounded-sm opacity-25" />
        <div className="h-6 bg-current rounded-sm opacity-15" />
        <div className="h-2 bg-current rounded-sm opacity-20 w-2/3 mx-auto" />
      </div>
    ),
  },
];

export default function LayoutSelector({ state, dispatch }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Layout</h3>
      <div className="grid grid-cols-2 gap-2">
        {LAYOUTS.map((layout) => {
          const isSelected = state.design.layout === layout.id;
          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => dispatch({ type: 'UPDATE_LAYOUT', value: layout.id })}
              className={`p-3 rounded-lg border-2 transition-all text-gray-400 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="mb-2">{layout.wireframe}</div>
              <p className="text-xs font-medium text-gray-700">{layout.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
