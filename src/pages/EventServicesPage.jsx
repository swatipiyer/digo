import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Package, Wrench, Mail, Globe, FileText, ArrowLeft, Check, Building2 } from 'lucide-react';

export default function EventServicesPage() {
  const [serviceType, setServiceType] = useState('food');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    serviceArea: '',
    priceRange: '',
    portfolio: '',
    specialties: '',
    message: '',
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const serviceTypes = [
    {
      id: 'food',
      label: 'Food Provider',
      icon: UtensilsCrossed,
      color: 'orange',
      bgColor: 'bg-orange-600',
      lightBg: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      focusColor: 'focus:border-orange-600 focus:ring-orange-600',
      btnColor: 'bg-orange-600 hover:bg-orange-700',
      activeBtn: 'border-orange-600 bg-orange-50 text-orange-700',
      description: 'Catering, food trucks, beverage services, and meal planning for events',
    },
    {
      id: 'swag',
      label: 'Swag Provider',
      icon: Package,
      color: 'pink',
      bgColor: 'bg-pink-600',
      lightBg: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-600',
      focusColor: 'focus:border-pink-600 focus:ring-pink-600',
      btnColor: 'bg-pink-600 hover:bg-pink-700',
      activeBtn: 'border-pink-600 bg-pink-50 text-pink-700',
      description: 'Custom merchandise, branded items, swag bags, and promotional materials',
    },
    {
      id: 'other',
      label: 'Other Services',
      icon: Wrench,
      color: 'gray',
      bgColor: 'bg-gray-700',
      lightBg: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700',
      focusColor: 'focus:border-gray-700 focus:ring-gray-700',
      btnColor: 'bg-gray-700 hover:bg-gray-800',
      activeBtn: 'border-gray-700 bg-gray-50 text-gray-800',
      description: 'Registration services, AV setup, photography, security, staffing, and more',
    },
  ];

  const activeService = serviceTypes.find(s => s.id === serviceType);

  const foodSpecialties = [
    'Full Catering',
    'Food Truck',
    'Breakfast & Coffee',
    'Lunch Buffet',
    'Dinner Service',
    'Beverages & Bar',
    'Snacks & Appetizers',
    'Dietary Accommodations (Vegan, GF, etc.)',
  ];

  const swagSpecialties = [
    'T-Shirts & Apparel',
    'Stickers & Pins',
    'Bags & Totes',
    'Tech Accessories',
    'Drinkware',
    'Notebooks & Pens',
    'Custom Packaging',
    'Eco-Friendly Products',
  ];

  const otherSpecialties = [
    'Registration & Check-in',
    'AV & Sound Equipment',
    'Photography & Videography',
    'Event Staffing',
    'Security Services',
    'Stage & Set Design',
    'Livestreaming',
    'Transportation & Logistics',
  ];

  const getSpecialties = () => {
    if (serviceType === 'food') return foodSpecialties;
    if (serviceType === 'swag') return swagSpecialties;
    return otherSpecialties;
  };

  const priceRanges = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
    'Custom / Contact for quote',
  ];

  const serviceAreas = [
    'San Francisco Bay Area',
    'Silicon Valley',
    'Greater Los Angeles',
    'San Diego',
    'Sacramento',
    'Pacific Northwest',
    'Nationwide',
    'Remote / Virtual Events',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event service submission:', { serviceType, ...formData });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        serviceArea: '',
        priceRange: '',
        portfolio: '',
        specialties: '',
        message: '',
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
            <div className={`w-12 h-12 ${activeService.bgColor} rounded-lg flex items-center justify-center`}>
              <activeService.icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Event Services</h1>
          </div>
          <p className="text-gray-600">Register as a service provider and connect with event organizers</p>
        </div>

        {/* Service Type Selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {serviceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setServiceType(type.id)}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all ${
                serviceType === type.id
                  ? type.activeBtn
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <type.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Service Description */}
        <div className={`${activeService.lightBg} border ${activeService.borderColor} rounded-lg p-6 mb-8`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{activeService.label}</h3>
          <p className="text-sm text-gray-700 mb-4">{activeService.description}</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className={`w-5 h-5 ${activeService.textColor} flex-shrink-0`} />
              <span><strong>Get Discovered</strong> - Organizers can find and book your services directly</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-5 h-5 ${activeService.textColor} flex-shrink-0`} />
              <span><strong>Build Your Profile</strong> - Showcase your portfolio and past event work</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-5 h-5 ${activeService.textColor} flex-shrink-0`} />
              <span><strong>Grow Your Business</strong> - Access a network of active event organizers in the Bay Area</span>
            </li>
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Company / Business Name *
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
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Description *
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
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                    placeholder="Tell us about your business, what you offer, and what makes you stand out..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                  Website
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
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-900 mb-2">
                  Portfolio / Past Work Link
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => handleChange('portfolio', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                    placeholder="Link to portfolio, Instagram, or past work examples"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Specialties *
                </label>
                <div className="flex flex-wrap gap-2">
                  {getSpecialties().map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => {
                        const current = formData.specialties ? formData.specialties.split(', ').filter(Boolean) : [];
                        const updated = current.includes(spec)
                          ? current.filter(s => s !== spec)
                          : [...current, spec];
                        handleChange('specialties', updated.join(', '));
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        formData.specialties?.includes(spec)
                          ? `${activeService.bgColor} text-white`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-semibold text-gray-900 mb-2">
                    Service Area *
                  </label>
                  <select
                    id="serviceArea"
                    required
                    value={formData.serviceArea}
                    onChange={(e) => handleChange('serviceArea', e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor} appearance-none bg-white`}
                  >
                    <option value="">Select service area</option>
                    {serviceAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-semibold text-gray-900 mb-2">
                    Typical Price Range *
                  </label>
                  <select
                    id="priceRange"
                    required
                    value={formData.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor} appearance-none bg-white`}
                  >
                    <option value="">Select price range</option>
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
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
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                      placeholder="contact@business.com"
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
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none ${activeService.focusColor}`}
                  placeholder="Anything else you'd like organizers to know about your services..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormData({
                companyName: '',
                contactName: '',
                email: '',
                phone: '',
                website: '',
                description: '',
                serviceArea: '',
                priceRange: '',
                portfolio: '',
                specialties: '',
                message: '',
              })}
              className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-3 ${activeService.btnColor} text-white rounded-lg font-medium text-sm transition-colors`}
            >
              Submit Service Application
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className={`${activeService.textColor} font-bold`}>1.</span>
              <span>We'll review your service provider application within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`${activeService.textColor} font-bold`}>2.</span>
              <span>Once approved, your business will appear in our event services directory</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`${activeService.textColor} font-bold`}>3.</span>
              <span>Event organizers can browse and contact you directly for bookings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`${activeService.textColor} font-bold`}>4.</span>
              <span>Build reviews and ratings from successful events to grow your reputation</span>
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
              <p className="text-sm font-semibold">Service application submitted!</p>
              <p className="text-xs text-gray-300">We'll review your application and add you to our directory</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
