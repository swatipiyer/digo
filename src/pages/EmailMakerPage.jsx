import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Eye, Save, ArrowLeft, Palette, Users, Plus, X } from 'lucide-react';
import Header from '../components/Header';
import { emailTemplates, EmailPreview } from '../components/EmailTemplates';
import { EventRecapEmailTemplate } from '../components/RichEmailTemplates';

export default function EmailMakerPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('announcement');
  const [subject, setSubject] = useState(emailTemplates.announcement.defaultSubject);
  const [content, setContent] = useState(emailTemplates.announcement.defaultContent);
  const [brandColor, setBrandColor] = useState('#1f2937');
  const [organizationName, setOrganizationName] = useState('TechEquity Ai');
  const [showPreview, setShowPreview] = useState(true);
  const [recipientCount, setRecipientCount] = useState(2847);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleTemplateSelect = (templateId) => {
    const template = emailTemplates[templateId];
    setSelectedTemplate(templateId);
    setSubject(template.defaultSubject);
    setContent(template.defaultContent);
  };

  const handleSendEmail = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleSaveDraft = () => {
    console.log('Draft saved');
  };

  const replaceVariables = (text) => {
    return text
      .replace(/{{organizationName}}/g, organizationName)
      .replace(/{{eventName}}/g, 'Sample Event Name');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <Link
            to="/discover/organizations/techequity-ai"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Builder</h1>
              <p className="text-gray-600">Create and send newsletters to your community</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <Users className="w-4 h-4" />
              <span>{recipientCount.toLocaleString()} recipients</span>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Choose a Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.values(emailTemplates).map((template) => {
              const IconComponent = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`border rounded-lg p-4 text-left transition-all hover:shadow-md ${
                    selectedTemplate === template.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="mb-2">
                    <IconComponent className={`w-8 h-8 ${template.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Editor */}
          <div className="space-y-4">
            {/* Organization Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-600" />
                Branding
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email Subject */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email Subject
              </h3>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
              />
              <p className="text-xs text-gray-500 mt-2">
                Preview: {replaceVariables(subject)}
              </p>
            </div>

            {/* Email Content */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Email Content</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={content.heading}
                    onChange={(e) => setContent({ ...content, heading: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Subheading
                  </label>
                  <input
                    type="text"
                    value={content.subheading}
                    onChange={(e) => setContent({ ...content, subheading: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Body Text
                  </label>
                  <textarea
                    value={content.body}
                    onChange={(e) => setContent({ ...content, body: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Call-to-Action Button Text
                  </label>
                  <input
                    type="text"
                    value={content.ctaText}
                    onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Button Link URL
                  </label>
                  <input
                    type="url"
                    value={content.ctaUrl}
                    onChange={(e) => setContent({ ...content, ctaUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors lg:hidden"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              <button
                onClick={handleSendEmail}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send to {recipientCount.toLocaleString()}
              </button>
            </div>

            {/* Variables Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Available Variables</h4>
              <div className="text-xs text-blue-800 space-y-1">
                <p><code className="bg-blue-100 px-1 py-0.5 rounded">{'{{organizationName}}'}</code> - Your organization name</p>
                <p><code className="bg-blue-100 px-1 py-0.5 rounded">{'{{eventName}}'}</code> - Event name (for event-specific emails)</p>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  Live Preview
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-[600px]">
                  {emailTemplates[selectedTemplate].isRich ? (
                    <EventRecapEmailTemplate
                      content={content}
                      organizationName={organizationName}
                      brandColor={brandColor}
                    />
                  ) : (
                    <EmailPreview
                      template={emailTemplates[selectedTemplate]}
                      content={content}
                      organizationName={organizationName}
                      brandColor={brandColor}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
}
