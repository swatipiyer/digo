import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Mail, Globe, FileText, Tag, ArrowLeft, Check, Linkedin, Upload, X } from 'lucide-react';
import Header from '../components/Header';
import { processSpeakerPhoto, validateImageFile } from '../utils/photoStorage';

export default function SpeakerSubmissionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    website: '',
    linkedin: '',
    bio: '',
    expertise: '',
    talkTitle: '',
    talkDescription: '',
    talkDuration: '',
    previousSpeaking: '',
    headshot: null,
  });
  const [headshotPreview, setHeadshotPreview] = useState(null);
  const [showLinkedInHelper, setShowLinkedInHelper] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const expertiseAreas = [
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
    'Other',
  ];

  const talkDurations = [
    'Lightning Talk (5-10 min)',
    'Standard Talk (20-30 min)',
    'Deep Dive (45-60 min)',
    'Workshop (90+ min)',
    'Panel Discussion',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create speaker object
      const speaker = {
        id: `speaker_${Date.now()}`,
        name: formData.fullName,
        title: formData.title,
        company: formData.company,
        bio: formData.bio,
        expertise: formData.expertise,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        linkedin: formData.linkedin,
        topic: formData.talkTitle,
        talkDescription: formData.talkDescription,
        talkDuration: formData.talkDuration,
        previousSpeaking: formData.previousSpeaking,
        photoUrl: headshotPreview,
        photoSource: headshotPreview ? 'upload' : 'default',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const speakers = JSON.parse(localStorage.getItem('digo_speakers') || '[]');
      speakers.push(speaker);
      localStorage.setItem('digo_speakers', JSON.stringify(speakers));

      console.log('Speaker submission saved:', speaker);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          title: '',
          company: '',
          website: '',
          linkedin: '',
          bio: '',
          expertise: '',
          talkTitle: '',
          talkDescription: '',
          talkDuration: '',
          previousSpeaking: '',
          headshot: null,
        });
        setHeadshotPreview(null);
        setUploadError(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving speaker:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHeadshotChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate file
      validateImageFile(file);

      // Convert to Base64 and compress
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;

        // Import compression function
        const { compressImage } = await import('../utils/photoStorage');
        const compressed = await compressImage(base64String);

        setHeadshotPreview(compressed);
        setFormData(prev => ({ ...prev, headshot: file }));
        setUploadError(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError(error.message);
      setHeadshotPreview(null);
      setFormData(prev => ({ ...prev, headshot: null }));
    }
  };

  const clearHeadshot = () => {
    setHeadshotPreview(null);
    setFormData(prev => ({ ...prev, headshot: null }));
    setUploadError(null);
    // Reset file input
    const fileInput = document.getElementById('headshot');
    if (fileInput) fileInput.value = '';
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
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Become an Event Speaker</h1>
          </div>
          <p className="text-gray-600">Share your expertise with the Digo community at upcoming events</p>
        </div>

        {/* Benefits Section */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Why Speak at Digo Events?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span><strong>Build Your Brand</strong> - Establish yourself as a thought leader in your field</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span><strong>Grow Your Network</strong> - Connect with engaged professionals and potential collaborators</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span><strong>Speaker Profile</strong> - Get a featured profile on our platform visible to all organizers</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span><strong>Recording & Promotion</strong> - Talks are recorded and shared across our channels</span>
            </li>
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="e.g. Senior Engineer"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-900 mb-2">
                  Speaker Bio *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="bio"
                    required
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="Tell us about yourself, your experience, and what makes you a great speaker..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-semibold text-gray-900 mb-2">
                  Area of Expertise *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="expertise"
                    required
                    value={formData.expertise}
                    onChange={(e) => handleChange('expertise', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 appearance-none bg-white"
                  >
                    <option value="">Select your area of expertise</option>
                    {expertiseAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="headshot" className="block text-sm font-semibold text-gray-900 mb-2">
                  Headshot Photo
                </label>

                {/* Photo Preview */}
                {headshotPreview && (
                  <div className="mb-3 relative inline-block">
                    <img
                      src={headshotPreview}
                      alt="Headshot preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-teal-600"
                    />
                    <button
                      type="button"
                      onClick={clearHeadshot}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  id="headshot"
                  accept="image/*"
                  onChange={handleHeadshotChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />

                {/* Upload Error */}
                {uploadError && (
                  <p className="text-xs text-red-600 mt-2">{uploadError}</p>
                )}

                {/* LinkedIn Photo Helper */}
                <button
                  type="button"
                  onClick={() => setShowLinkedInHelper(!showLinkedInHelper)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Linkedin className="w-3 h-3" />
                  {showLinkedInHelper ? 'Hide' : 'How to upload from LinkedIn'}
                </button>

                {showLinkedInHelper && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      Upload from LinkedIn
                    </h4>
                    <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                      <li>Go to your LinkedIn profile</li>
                      <li>Click on your profile photo</li>
                      <li>Click "Download" or right-click and "Save image as..."</li>
                      <li>Upload the downloaded image using the field above</li>
                    </ol>
                    <p className="text-xs text-gray-600 mt-2 italic">
                      Tip: Use a high-quality professional headshot for best results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Links</h3>

            <div className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                    Personal Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-900 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      placeholder="https://linkedin.com/in/you"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Talk Proposal */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Talk Proposal</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="talkTitle" className="block text-sm font-semibold text-gray-900 mb-2">
                  Proposed Talk Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mic className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="talkTitle"
                    required
                    value={formData.talkTitle}
                    onChange={(e) => handleChange('talkTitle', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="e.g. Building Scalable AI Pipelines in Production"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="talkDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                  Talk Description *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="talkDescription"
                    required
                    value={formData.talkDescription}
                    onChange={(e) => handleChange('talkDescription', e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="Describe your talk, key takeaways, and what the audience will learn..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="talkDuration" className="block text-sm font-semibold text-gray-900 mb-2">
                  Preferred Talk Duration *
                </label>
                <select
                  id="talkDuration"
                  required
                  value={formData.talkDuration}
                  onChange={(e) => handleChange('talkDuration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 appearance-none bg-white"
                >
                  <option value="">Select preferred duration</option>
                  {talkDurations.map((dur) => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="previousSpeaking" className="block text-sm font-semibold text-gray-900 mb-2">
                  Previous Speaking Experience
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="previousSpeaking"
                    value={formData.previousSpeaking}
                    onChange={(e) => handleChange('previousSpeaking', e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    placeholder="List any conferences, meetups, or events you've spoken at previously..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  title: '',
                  company: '',
                  website: '',
                  linkedin: '',
                  bio: '',
                  expertise: '',
                  talkTitle: '',
                  talkDescription: '',
                  talkDuration: '',
                  previousSpeaking: '',
                  headshot: null,
                });
                clearHeadshot();
              }}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg font-medium text-sm hover:bg-teal-700 transition-colors"
            >
              Submit Speaker Application
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">1.</span>
              <span>Our curation team reviews your speaker profile and talk proposal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">2.</span>
              <span>We'll match you with upcoming events that fit your expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">3.</span>
              <span>Event organizers will reach out to confirm scheduling and logistics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">4.</span>
              <span>Your speaker profile will be listed in our directory for future opportunities</span>
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
              <p className="text-sm font-semibold">Speaker application submitted!</p>
              <p className="text-xs text-gray-300">We'll review your profile and get back to you soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
