import { useState, useEffect } from 'react';
import { Send, Save, Trash2, X, Layout, Paintbrush, Type } from 'lucide-react';
import { useEmailBuilder } from '../hooks/useEmailBuilder';
import { useImageUpload } from '../hooks/useImageUpload';
import TemplateGallery from '../components/email-builder/TemplateGallery';
import TemplateVariantPicker from '../components/email-builder/TemplateVariantPicker';
import SectionTogglePanel from '../components/email-builder/SectionTogglePanel';
import DesignControlsPanel from '../components/email-builder/DesignControlsPanel';
import ColorPaletteEditor from '../components/email-builder/ColorPaletteEditor';
import ImageUploadBlock from '../components/email-builder/ImageUploadBlock';
import LayoutSelector from '../components/email-builder/LayoutSelector';
import ContentEditor from '../components/email-builder/ContentEditor';
import EmailPreviewPane from '../components/email-builder/EmailPreviewPane';

const EDITOR_TABS = [
  { id: 'templates', label: 'Templates', icon: Layout },
  { id: 'design', label: 'Design', icon: Paintbrush },
  { id: 'content', label: 'Content', icon: Type },
];

export default function EmailMakerPage({ embedded = false }) {
  const [state, dispatch, { saveTemplate, loadTemplate, deleteTemplate, getSavedTemplates }] = useEmailBuilder();
  const { handleUpload, handleRemove } = useImageUpload(dispatch);
  const [editorTab, setEditorTab] = useState('templates');
  const [recipientCount] = useState(2847);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [savedTemplates, setSavedTemplates] = useState([]);

  useEffect(() => {
    setSavedTemplates(getSavedTemplates());
  }, [getSavedTemplates]);

  const handleSendEmail = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSaveConfirm = () => {
    if (!templateName.trim()) return;
    saveTemplate(templateName);
    setShowSaveModal(false);
    setTemplateName('');
    setSavedTemplates(getSavedTemplates());
  };

  const handleDeleteSaved = (id) => {
    if (confirm('Delete this saved template?')) {
      deleteTemplate(id);
      setSavedTemplates(getSavedTemplates());
    }
  };

  const handleLoadSaved = (template) => {
    loadTemplate(template);
    setEditorTab('design');
  };

  const editorContent = (
    <>
      {/* Saved Templates */}
      {savedTemplates.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">My Saved Templates</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {savedTemplates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 bg-white rounded-lg p-3 min-w-[180px] flex-shrink-0 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{template.name}</h3>
                  <button
                    type="button"
                    onClick={() => handleDeleteSaved(template.id)}
                    className="text-gray-400 hover:text-red-600 flex-shrink-0 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(template.createdAt).toLocaleDateString()}
                </p>
                <button
                  type="button"
                  onClick={() => handleLoadSaved(template)}
                  className="w-full px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
                >
                  Load
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 xl:col-span-4">
          {/* Tab Bar */}
          <div className="flex bg-white border border-gray-200 rounded-lg p-1 mb-4">
            {EDITOR_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditorTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    editorTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
            {editorTab === 'templates' && (
              <TemplateGallery
                state={state}
                dispatch={dispatch}
                onSelect={() => setEditorTab('content')}
              />
            )}

            {editorTab === 'design' && (
              <>
                <TemplateVariantPicker state={state} dispatch={dispatch} />
                <LayoutSelector state={state} dispatch={dispatch} />
                <SectionTogglePanel state={state} dispatch={dispatch} />
                <ColorPaletteEditor state={state} dispatch={dispatch} />
                <DesignControlsPanel state={state} dispatch={dispatch} />
                {state.sections.heroImage && (
                  <ImageUploadBlock
                    slot="hero"
                    label="Hero Image"
                    image={state.images.hero}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                )}
                {state.sections.inlineImage && (
                  <ImageUploadBlock
                    slot="inline"
                    label="Inline Image"
                    image={state.images.inline}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                )}
              </>
            )}

            {editorTab === 'content' && (
              <ContentEditor state={state} dispatch={dispatch} />
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 pb-4">
              <button
                type="button"
                onClick={handleSaveClick}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="lg:col-span-8 xl:col-span-8">
          <EmailPreviewPane state={state} />
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Save Template</h3>
              <button type="button" onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template name..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveConfirm()}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-grow-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Email sent successfully!</p>
              <p className="text-xs text-gray-300">Delivered to {recipientCount.toLocaleString()} members</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (embedded) {
    return editorContent;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {editorContent}
      </main>
    </div>
  );
}
