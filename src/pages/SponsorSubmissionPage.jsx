import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Building2, Mail, Globe, FileText, Tag, ArrowLeft, Check } from 'lucide-react';
import Header from '../components/Header';

export default function SponsorSubmissionPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    sponsorshipLevel: '',
    interests: '',
    message: '',
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const sponsorshipLevels = [
    'Platinum ($10,000+)',
    'Gold ($5,000 - $9,999)',
    'Silver ($2,500 - $4,999)',
    'Bronze ($1,000 - $2,499)',
    'Community Partner (Under $1,000)',
  ];

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sponsor submission:', formData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Reset form
      setFormData({
        companyName: '',
        industry: '',
        website: '',
        contactName: '',
        email: '',
        phone: '',
        sponsorshipLevel: '',
        interests: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Become an Event Sponsor</h1>
          </div>
          <p className="text-gray-600">Partner with us to support amazing events and reach our community</p>
        </div>

        {/* Benefits Section */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sponsorship Benefits</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span><strong>Brand Visibility</strong> - Logo placement on event pages, emails, and promotional materials</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span><strong>Community Access</strong> - Connect with engaged attendees and industry professionals</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span><strong>Speaking Opportunities</strong> - Showcase your expertise through sponsored sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span><strong>Booth & Demo Space</strong> - Premium sponsors get dedicated exhibition space</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span><strong>Analytics & Insights</strong> - Track engagement and ROI from your sponsorship</span>
            </li>
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>

            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-2">
                  Industry *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="industry"
                    required
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 appearance-none bg-white"
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Website *
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    placeholder="https://yourcompany.com"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    placeholder="contact@company.com"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Sponsorship Details */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sponsorship Details</h3>

            <div className="space-y-4">
              {/* Sponsorship Level */}
              <div>
                <label htmlFor="sponsorshipLevel" className="block text-sm font-semibold text-gray-900 mb-2">
                  Interested Sponsorship Level *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="sponsorshipLevel"
                    required
                    value={formData.sponsorshipLevel}
                    onChange={(e) => handleChange('sponsorshipLevel', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 appearance-none bg-white"
                  >
                    <option value="">Select sponsorship level</option>
                    {sponsorshipLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label htmlFor="interests" className="block text-sm font-semibold text-gray-900 mb-2">
                  Areas of Interest
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleChange('interests', e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    placeholder="What types of events or categories are you most interested in sponsoring? (e.g., AI/ML, Startups, Technology)"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    placeholder="Tell us more about your sponsorship goals and what you'd like to achieve..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormData({
                companyName: '',
                industry: '',
                website: '',
                contactName: '',
                email: '',
                phone: '',
                sponsorshipLevel: '',
                interests: '',
                message: '',
              })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors"
            >
              Submit Sponsorship Inquiry
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>We'll review your sponsorship inquiry within 24-48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>Our partnerships team will reach out to discuss opportunities that match your interests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>We'll send you a customized sponsorship package with detailed benefits and pricing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span>Once confirmed, we'll begin promoting your brand across our event platform</span>
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
              <p className="text-sm font-semibold">Sponsorship inquiry submitted!</p>
              <p className="text-xs text-gray-300">Our team will contact you soon to discuss opportunities</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
