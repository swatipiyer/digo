import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Building2, Check, ArrowLeft } from 'lucide-react';

export default function VenueSubmissionPage() {
  const [formData, setFormData] = useState({
    venueName: '',
    address: '',
    email: '',
    wantVerified: false,
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Venue submission:', formData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Reset form
      setFormData({
        venueName: '',
        address: '',
        email: '',
        wantVerified: false,
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
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Submit a Venue</h1>
          </div>
          <p className="text-gray-600">Get listed in our event venue catalog</p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Venue Name */}
          <div>
            <label htmlFor="venueName" className="block text-sm font-semibold text-gray-900 mb-2">
              Venue Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="venueName"
                required
                value={formData.venueName}
                onChange={(e) => handleChange('venueName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder="Enter venue name"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
              Venue Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="address"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder="123 Main St, City, State ZIP"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Venue Contact Email Address
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
                placeholder="contact@venue.com"
              />
            </div>
          </div>

          {/* Verification Checkbox */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.wantVerified}
                  onChange={(e) => handleChange('wantVerified', e.target.checked)}
                  className="w-5 h-5 border-2 border-blue-600 rounded cursor-pointer appearance-none checked:bg-blue-600 transition-colors"
                />
                {formData.wantVerified && (
                  <Check className="w-4 h-4 text-white absolute pointer-events-none" strokeWidth={3} />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Would you like to be verified?
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Verified venues get a badge on their listing and appear higher in search results. We'll review your submission and contact you via email.
                </p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormData({ venueName: '', address: '', email: '', wantVerified: false })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Submit Venue
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>We'll review your venue submission within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>You'll receive an email confirmation once your venue is approved</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>If you requested verification, our team will contact you with next steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Your venue will appear in the Digo venue catalog and appear in search results</span>
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
              <p className="text-sm font-semibold">Venue submitted successfully!</p>
              <p className="text-xs text-gray-300">We'll review your submission and get back to you soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
