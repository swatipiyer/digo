import { Mail, Type, Layers } from 'lucide-react';

function CustomSectionEditor({ section, dispatch }) {
  const updateContent = (value) => {
    dispatch({ type: 'UPDATE_CUSTOM_SECTION', payload: { id: section.id, content: value } });
  };

  switch (section.type) {
    case 'text':
      return (
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">{section.title}</label>
          <textarea
            value={section.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Enter text content..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 resize-none"
          />
        </div>
      );
    case 'heading':
      return (
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">{section.title}</label>
          <input
            type="text"
            value={section.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Enter heading text..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
          />
        </div>
      );
    case 'image':
      return (
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">{section.title}</label>
          <input
            type="text"
            value={section.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Enter image URL..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
          />
          {section.content && (
            <img
              src={section.content}
              alt="Preview"
              className="mt-2 w-full h-20 object-cover rounded border border-gray-200"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
        </div>
      );
    case 'divider':
      return (
        <div>
          <label className="text-xs font-medium text-gray-700 block">{section.title}</label>
          <p className="text-xs text-gray-400 mt-0.5">No content needed -- a horizontal line will be displayed.</p>
        </div>
      );
    case 'spacer': {
      const height = parseInt(section.content, 10) || 40;
      return (
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            {section.title} -- Height: {height}px
          </label>
          <input
            type="range"
            min={20}
            max={100}
            value={height}
            onChange={(e) => updateContent(e.target.value)}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>20px</span>
            <span>100px</span>
          </div>
        </div>
      );
    }
    case 'button': {
      let btnData = { text: '', url: '' };
      try { btnData = JSON.parse(section.content); } catch {}
      const updateBtn = (field, value) => {
        updateContent(JSON.stringify({ ...btnData, [field]: value }));
      };
      return (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 block">{section.title}</label>
          <input
            type="text"
            value={btnData.text}
            onChange={(e) => updateBtn('text', e.target.value)}
            placeholder="Button text..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
          />
          <input
            type="url"
            value={btnData.url}
            onChange={(e) => updateBtn('url', e.target.value)}
            placeholder="Button URL (https://...)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
          />
        </div>
      );
    }
    default:
      return null;
  }
}

export default function ContentEditor({ state, dispatch }) {
  const { content, subject, sections } = state;
  const customSections = state.customSections || [];

  const insertVariable = (field, variable) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { [field]: (content[field] || '') + variable } });
  };

  return (
    <div className="space-y-4">
      {/* Branding */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Branding</h3>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Organization Name</label>
          <input
            type="text"
            value={state.branding.organizationName}
            onChange={(e) => dispatch({ type: 'UPDATE_BRANDING', payload: { organizationName: e.target.value } })}
            placeholder="Your Organization"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Email Subject */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5" />
          Subject Line
        </h3>
        <input
          type="text"
          value={subject}
          onChange={(e) => dispatch({ type: 'UPDATE_SUBJECT', payload: e.target.value })}
          placeholder="Enter email subject..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
        />
        <div className="flex gap-1.5 mt-2">
          <button
            type="button"
            onClick={() => dispatch({ type: 'UPDATE_SUBJECT', payload: subject + '{{eventName}}' })}
            className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100"
          >
            + Event Name
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'UPDATE_SUBJECT', payload: subject + '{{organizationName}}' })}
            className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100"
          >
            + Org Name
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" />
          Content
        </h3>
        <div className="space-y-3">
          {/* Heading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">Heading</label>
              <span className="text-[10px] text-gray-400">{(content.heading || '').length} chars</span>
            </div>
            <input
              type="text"
              value={content.heading}
              onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: { heading: e.target.value } })}
              placeholder="Your email heading"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Subheading */}
          {sections.subheading && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">Subheading</label>
                <span className="text-[10px] text-gray-400">{(content.subheading || '').length} chars</span>
              </div>
              <input
                type="text"
                value={content.subheading}
                onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: { subheading: e.target.value } })}
                placeholder="A short subtitle"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          )}

          {/* Body */}
          {sections.bodyText && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">Body Text</label>
                <span className="text-[10px] text-gray-400">{(content.body || '').length} chars</span>
              </div>
              <textarea
                value={content.body}
                onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: { body: e.target.value } })}
                placeholder="Write your email body here..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 resize-none"
              />
              <div className="flex gap-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => insertVariable('body', '{{organizationName}}')}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200"
                >
                  + Org Name
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('body', '{{eventName}}')}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200"
                >
                  + Event Name
                </button>
              </div>
            </div>
          )}

          {/* CTA */}
          {sections.cta && (
            <>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: { ctaText: e.target.value } })}
                  placeholder="Register Now"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Button URL</label>
                <input
                  type="url"
                  value={content.ctaUrl}
                  onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: { ctaUrl: e.target.value } })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Sections */}
      {customSections.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Custom Sections
          </h3>
          <div className="space-y-3">
            {customSections.map((section) => (
              <CustomSectionEditor key={section.id} section={section} dispatch={dispatch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
