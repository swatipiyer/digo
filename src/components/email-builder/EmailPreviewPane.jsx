import { useState } from 'react';
import { Monitor, Smartphone, ZoomIn, ZoomOut, Eye } from 'lucide-react';
import EnhancedEmailPreview from '../EnhancedEmailPreview';

export default function EmailPreviewPane({ state }) {
  const [deviceSize, setDeviceSize] = useState('desktop'); // 'desktop' | 'mobile'
  const [zoom, setZoom] = useState(100);

  const previewWidth = deviceSize === 'mobile' ? 360 : 600;
  const scale = zoom / 100;

  return (
    <div className="sticky top-4">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            Live Preview
          </h3>

          <div className="flex items-center gap-3">
            {/* Device Toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setDeviceSize('desktop')}
                className={`p-1.5 transition-colors ${
                  deviceSize === 'desktop' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Desktop preview"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceSize('mobile')}
                className={`p-1.5 transition-colors ${
                  deviceSize === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Mobile preview"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-gray-500 w-8 text-center">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject Line Preview */}
        {state.subject && (
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Subject:</span>{' '}
              {state.subject
                .replace(/\{\{organizationName\}\}/g, state.branding.organizationName || 'Your Organization')
                .replace(/\{\{eventName\}\}/g, 'Event Name')}
            </p>
          </div>
        )}

        {/* Preview Area */}
        <div className="bg-gray-100 p-4 overflow-auto" style={{ maxHeight: '700px' }}>
          <div
            className="mx-auto transition-all duration-200"
            style={{
              width: `${previewWidth}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <EnhancedEmailPreview state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
