import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Globe, Users, FileText, Tag, ArrowLeft, Check } from 'lucide-react';
import Header from '../components/Header';

export default function EventSubmissionPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    category: '',
    date: '',
    time: '',
    eventType: 'in-person',
    location: '',
    onlineLink: '',
    capacity: '',
    organizerName: '',
    organizerEmail: '',
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
    console.log('Event submission:', formData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Reset form
      setFormData({
        eventName: '',
        description: '',
        category: '',
        date: '',
        time: '',
        eventType: 'in-person',
        location: '',
        onlineLink: '',
        capacity: '',
        organizerName: '',
        organizerEmail: '',
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
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Submit Your Event</h1>
          </div>
          <p className="text-gray-600">Share your event with the Digo community</p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Event Name */}
          <div>
            <label htmlFor="eventName" className="block text-sm font-semibold text-gray-900 mb-2">
              Event Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="eventName"
                required
                value={formData.eventName}
                onChange={(e) => handleChange('eventName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder="Enter event name"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Event Description *
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
                placeholder="Describe your event, what attendees will learn, and what to expect..."
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              Category *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                id="date"
                required
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Time *
              </label>
              <input
                type="time"
                id="time"
                required
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Event Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('eventType', 'in-person')}
                className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                  formData.eventType === 'in-person'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <MapPin className="w-5 h-5" />
                In Person
              </button>
              <button
                type="button"
                onClick={() => handleChange('eventType', 'online')}
                className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                  formData.eventType === 'online'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <Globe className="w-5 h-5" />
                Online
              </button>
            </div>
          </div>

          {/* Location (In Person) */}
          {formData.eventType === 'in-person' && (
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="123 Main St, City, State ZIP"
                />
              </div>
            </div>
          )}

          {/* Online Link */}
          {formData.eventType === 'online' && (
            <div>
              <label htmlFor="onlineLink" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Link *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="onlineLink"
                  required
                  value={formData.onlineLink}
                  onChange={(e) => handleChange('onlineLink', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            </div>
          )}

          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-semibold text-gray-900 mb-2">
              Event Capacity *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder="Maximum number of attendees"
              />
            </div>
          </div>

          {/* Organizer Information */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer Information</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="organizerName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="organizerName"
                  required
                  value={formData.organizerName}
                  onChange={(e) => handleChange('organizerName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="organizerEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="organizerEmail"
                  required
                  value={formData.organizerEmail}
                  onChange={(e) => handleChange('organizerEmail', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormData({
                eventName: '',
                description: '',
                category: '',
                date: '',
                time: '',
                eventType: 'in-person',
                location: '',
                onlineLink: '',
                capacity: '',
                organizerName: '',
                organizerEmail: '',
              })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Submit Event
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>We'll review your event submission within 24-48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>You'll receive an email confirmation once your event is approved</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Your event will appear on the Digo platform and be discoverable by attendees</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>You'll be able to manage registrations and communicate with attendees</span>
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
              <p className="text-sm font-semibold">Event submitted successfully!</p>
              <p className="text-xs text-gray-300">We'll review your submission and get back to you soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
