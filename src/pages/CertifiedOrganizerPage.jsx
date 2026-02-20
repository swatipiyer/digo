import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Building2, Mail, Globe, Users, FileText, Image, ArrowLeft, Check } from 'lucide-react';

export default function CertifiedOrganizerPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    description: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    category: '',
    eventCount: '',
    logo: null,
    banner: null,
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const categories = [
    'Technology',
    'Business',
    'AI/ML',
    'Networking',
    'Workshops',
    'Startups',
    'Education',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Certified organizer submission:', formData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Reset form
      setFormData({
        organizationName: '',
        description: '',
        website: '',
        contactName: '',
        email: '',
        phone: '',
        category: '',
        eventCount: '',
        logo: null,
        banner: null,
      });
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/organizers"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Organizers
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Become a Certified Organizer</h1>
          </div>
          <p className="text-gray-600">Get verified and grow your event community on Digo</p>
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Benefits of Certification</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>Verified Badge</strong> - Stand out with a verified checkmark on your profile</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>Higher Visibility</strong> - Appear at the top of search results and discovery pages</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>Advanced Tools</strong> - Access email builder, analytics, and attendee management features</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>Custom Branding</strong> - Upload banner and logo for your organization profile</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>Priority Support</strong> - Get dedicated support from the Digo team</span>
            </li>
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Organization Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>

            <div className="space-y-4">
              {/* Organization Name */}
              <div>
                <label htmlFor="organizationName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Organization Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="organizationName"
                    required
                    value={formData.organizationName}
                    onChange={(e) => handleChange('organizationName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter organization name"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                  Organization Description *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Tell us about your organization, mission, and what types of events you host..."
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                  Primary Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                  Organization Website *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="website"
                    required
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="https://yourorganization.com"
                  />
                </div>
              </div>

              {/* Event Count */}
              <div>
                <label htmlFor="eventCount" className="block text-sm font-semibold text-gray-900 mb-2">
                  Estimated Events Per Year *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="eventCount"
                    required
                    min="1"
                    value={formData.eventCount}
                    onChange={(e) => handleChange('eventCount', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Number of events you plan to host"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="contact@organization.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Branding Assets */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding Assets</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="logo" className="block text-sm font-semibold text-gray-900 mb-2">
                  Organization Logo
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Image className="w-5 h-5" />
                    <span>Upload your logo (PNG, JPG, or SVG)</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={(e) => handleChange('logo', e.target.files[0])}
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="banner" className="block text-sm font-semibold text-gray-900 mb-2">
                  Banner Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Image className="w-5 h-5" />
                    <span>Upload a banner image (recommended: 1200x400px)</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="banner"
                  accept="image/*"
                  onChange={(e) => handleChange('banner', e.target.files[0])}
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormData({
                organizationName: '',
                description: '',
                website: '',
                contactName: '',
                email: '',
                phone: '',
                category: '',
                eventCount: '',
                logo: null,
                banner: null,
              })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Application Process</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Submit your application with all required information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Our team will review your application within 3-5 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>We may reach out for additional verification or information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Once approved, you'll receive your verified badge and access to all premium features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">5.</span>
              <span>Your organization will appear in the certified organizers directory</span>
            </li>
          </ul>
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
              <p className="text-sm font-semibold">Application submitted successfully!</p>
              <p className="text-xs text-gray-300">We'll review your application and contact you soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
