import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Calendar, MapPin, Globe, FileText, Tag, Users, ArrowLeft, Check, Plus, X } from 'lucide-react';

export default function CallForSpeakersPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventType: 'in-person',
    onlineLink: '',
    organizerName: '',
    organizerEmail: '',
    organizationName: '',
    description: '',
    topics: [],
    talkFormats: [],
    expectedAttendees: '',
    deadline: '',
    compensation: '',
    additionalInfo: '',
  });
  const [topicInput, setTopicInput] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const availableTopics = [
    'Artificial Intelligence / ML',
    'Cloud & Infrastructure',
    'Cybersecurity',
    'Data Science',
    'DevOps & SRE',
    'Frontend / UI',
    'Leadership & Management',
    'Product Management',
    'Startups & Entrepreneurship',
    'Web3 / Blockchain',
  ];

  const talkFormatOptions = [
    'Lightning Talk (5-10 min)',
    'Standard Talk (20-30 min)',
    'Deep Dive (45-60 min)',
    'Workshop (90+ min)',
    'Panel Discussion',
    'Fireside Chat',
  ];

  const compensationOptions = [
    'Honorarium provided',
    'Travel & accommodation covered',
    'Speaker dinner included',
    'Free event ticket',
    'No compensation (volunteer)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Call for speakers submission:', formData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setFormData({
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventType: 'in-person',
        onlineLink: '',
        organizerName: '',
        organizerEmail: '',
        organizationName: '',
        description: '',
        topics: [],
        talkFormats: [],
        expectedAttendees: '',
        deadline: '',
        compensation: '',
        additionalInfo: '',
      });
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTopic = (topic) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const addCustomTopic = () => {
    if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
      setFormData(prev => ({ ...prev, topics: [...prev.topics, topicInput.trim()] }));
      setTopicInput('');
    }
  };

  const toggleTalkFormat = (format) => {
    setFormData(prev => ({
      ...prev,
      talkFormats: prev.talkFormats.includes(format)
        ? prev.talkFormats.filter(f => f !== format)
        : [...prev.talkFormats, format],
    }));
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
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Call for Speakers</h1>
          </div>
          <p className="text-gray-600">Create a call for speakers to find the perfect presenters for your event</p>
        </div>

        {/* Info Banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">How It Works</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span><strong>Post Your CFP</strong> - Describe your event and the topics you're looking for</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span><strong>Receive Proposals</strong> - Speakers from our community submit their talk ideas</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span><strong>Review & Select</strong> - Browse proposals with speaker profiles and choose your lineup</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span><strong>Coordinate</strong> - Use our platform to communicate with selected speakers</span>
            </li>
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Event Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>

            <div className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="e.g. AI Summit 2026"
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="Describe your event, its goals, and the type of speakers you're looking for..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-semibold text-gray-900 mb-2">
                    Submission Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    required
                    value={formData.deadline}
                    onChange={(e) => handleChange('deadline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
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
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
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
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                    Online
                  </button>
                </div>
              </div>

              {formData.eventType === 'in-person' && (
                <div>
                  <label htmlFor="eventLocation" className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="eventLocation"
                      required
                      value={formData.eventLocation}
                      onChange={(e) => handleChange('eventLocation', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                </div>
              )}

              {formData.eventType === 'online' && (
                <div>
                  <label htmlFor="onlineLink" className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Platform / Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="onlineLink"
                      value={formData.onlineLink}
                      onChange={(e) => handleChange('onlineLink', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="expectedAttendees" className="block text-sm font-semibold text-gray-900 mb-2">
                  Expected Attendees *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="expectedAttendees"
                    required
                    min="1"
                    value={formData.expectedAttendees}
                    onChange={(e) => handleChange('expectedAttendees', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="Expected number of attendees"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Desired Topics</h3>
            <p className="text-sm text-gray-600 mb-3">Select topics you'd like speakers to cover, or add custom ones.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {availableTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    formData.topics.includes(topic)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Custom topic input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTopic())}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="Add a custom topic..."
              />
              <button
                type="button"
                onClick={addCustomTopic}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Custom topics display */}
            {formData.topics.filter(t => !availableTopics.includes(t)).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.topics.filter(t => !availableTopics.includes(t)).map((topic) => (
                  <span key={topic} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-medium">
                    {topic}
                    <button type="button" onClick={() => toggleTopic(topic)} className="hover:text-indigo-200">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Talk Formats */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Talk Formats</h3>
            <p className="text-sm text-gray-600 mb-3">Select all formats you're accepting for this event.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {talkFormatOptions.map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => toggleTalkFormat(format)}
                  className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg text-sm font-medium text-left transition-all ${
                    formData.talkFormats.includes(format)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    formData.talkFormats.includes(format)
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {formData.talkFormats.includes(format) && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Speaker Compensation */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Speaker Compensation</h3>

            <div>
              <label htmlFor="compensation" className="block text-sm font-semibold text-gray-900 mb-2">
                What do you offer speakers? *
              </label>
              <select
                id="compensation"
                required
                value={formData.compensation}
                onChange={(e) => handleChange('compensation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 appearance-none bg-white"
              >
                <option value="">Select compensation type</option>
                {compensationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer Information</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="organizationName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="organizationName"
                  required
                  value={formData.organizationName}
                  onChange={(e) => handleChange('organizationName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  placeholder="Your organization name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organizerName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="organizerName"
                    required
                    value={formData.organizerName}
                    onChange={(e) => handleChange('organizerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="Your name"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="you@organization.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  placeholder="Any other details speakers should know about your event..."
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
                eventDate: '',
                eventLocation: '',
                eventType: 'in-person',
                onlineLink: '',
                organizerName: '',
                organizerEmail: '',
                organizationName: '',
                description: '',
                topics: [],
                talkFormats: [],
                expectedAttendees: '',
                deadline: '',
                compensation: '',
                additionalInfo: '',
              })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
            >
              Publish Call for Speakers
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">After Publishing</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">1.</span>
              <span>Your CFP will be listed on the Digo platform and shared with our speaker community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">2.</span>
              <span>Speakers can browse and submit proposals until your deadline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">3.</span>
              <span>You'll receive email notifications as proposals come in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">4.</span>
              <span>Review proposals in your dashboard and select your speakers</span>
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
              <p className="text-sm font-semibold">Call for Speakers published!</p>
              <p className="text-xs text-gray-300">Speakers will start receiving your CFP shortly</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
