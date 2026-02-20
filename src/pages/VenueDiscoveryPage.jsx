import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, DollarSign, X, ArrowLeft, Star, Check } from 'lucide-react';

export default function VenueDiscoveryPage({ embedded = false }) {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    eventDate: '',
    eventTime: '',
    attendees: '',
    eventType: '',
    setupRequirements: '',
    cateringNeeds: '',
    avNeeds: '',
    message: '',
  });

  // Sample SF Bay Area venues
  const venues = [
    {
      id: 1,
      name: 'Snowflake Silicon Valley AI Hub',
      address: '135 Constitution Dr, Menlo Park, CA 94025',
      capacity: 200,
      price: '$$$',
      description: 'Modern tech hub with state-of-the-art AV equipment and flexible seating arrangements.',
      amenities: ['WiFi', 'Projector', 'Sound System', 'Catering Kitchen', 'Parking'],
      verified: true,
      position: { top: '55%', left: '50%' },
      color: 'bg-red-500',
    },
    {
      id: 2,
      name: 'Plug and Play Tech Center',
      address: '440 N Wolfe Rd, Sunnyvale, CA 94085',
      capacity: 300,
      price: '$$$',
      description: 'Innovation hub with multiple event spaces and networking areas.',
      amenities: ['WiFi', 'Stage', 'Sound System', 'Video Recording', 'Parking'],
      verified: true,
      position: { top: '72%', left: '62%' },
      color: 'bg-purple-600',
    },
    {
      id: 3,
      name: 'The ThinkTank VC',
      address: '275 Castro St, Mountain View, CA 94041',
      capacity: 150,
      price: '$$',
      description: 'Intimate venue perfect for workshops and networking events.',
      amenities: ['WiFi', 'Whiteboard', 'Projector', 'Coffee Bar'],
      verified: false,
      position: { top: '67%', left: '56%' },
      color: 'bg-indigo-500',
    },
    {
      id: 4,
      name: 'Computer History Museum',
      address: '1401 N Shoreline Blvd, Mountain View, CA 94043',
      capacity: 400,
      price: '$$$$',
      description: 'Unique venue with exhibits and modern event spaces for tech-focused gatherings.',
      amenities: ['WiFi', 'Museum Access', 'Catering', 'AV Equipment', 'Parking'],
      verified: true,
      position: { top: '62%', left: '58%' },
      color: 'bg-pink-500',
    },
    {
      id: 5,
      name: 'Stanford University',
      address: '450 Serra Mall, Stanford, CA 94305',
      capacity: 500,
      price: '$$$',
      description: 'Academic venue with various halls and auditoriums available for events.',
      amenities: ['WiFi', 'Auditorium', 'Lecture Halls', 'Parking'],
      verified: true,
      position: { top: '60%', left: '52%' },
      color: 'bg-amber-500',
    },
    {
      id: 6,
      name: 'San Jose State University',
      address: '1 Washington Sq, San Jose, CA 95192',
      capacity: 600,
      price: '$$',
      description: 'Large university campus with multiple event venues and facilities.',
      amenities: ['WiFi', 'Conference Rooms', 'Theater', 'Parking'],
      verified: false,
      position: { top: '82%', left: '68%' },
      color: 'bg-orange-400',
    },
    {
      id: 7,
      name: 'Menlo College',
      address: '1000 El Camino Real, Atherton, CA 94027',
      capacity: 250,
      price: '$$',
      description: 'College campus with modern facilities and beautiful outdoor spaces.',
      amenities: ['WiFi', 'Event Hall', 'Outdoor Space', 'Parking'],
      verified: false,
      position: { top: '52%', left: '47%' },
      color: 'bg-yellow-500',
    },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Create booking request
    const bookingRequest = {
      id: Date.now(),
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      ...bookingForm,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('digo_venue_bookings') || '[]');
    existingBookings.push(bookingRequest);
    localStorage.setItem('digo_venue_bookings', JSON.stringify(existingBookings));

    // Show success message (you can add a toast here)
    alert('Booking request submitted successfully! The venue will review your request.');

    // Reset form and close modal
    setBookingForm({
      name: '',
      email: '',
      eventDate: '',
      eventTime: '',
      attendees: '',
      eventType: '',
      setupRequirements: '',
      cateringNeeds: '',
      avNeeds: '',
      message: '',
    });
    setShowBookingModal(false);
  };

  return (
    <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>

      <main className={embedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}>
        {/* Page Header */}
        {!embedded && (
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Digo Venues</h1>
                <p className="text-lg text-gray-600">Find a venue for your next event</p>
              </div>
              <Link
                to="/add-venue"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Submit Venue
              </Link>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-[600px]">
              <iframe
                title="Bay Area Venues Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d202406.12676862!2d-122.08!3d37.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Venue List / Details */}
          <div className="lg:col-span-1">
            {selectedVenue ? (
              // Venue Details
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`${selectedVenue.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0`}>
                      {selectedVenue.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedVenue.name}</h3>
                      {selectedVenue.verified && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                          <img src="/digo.png" alt="Digo" className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVenue(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{selectedVenue.address}</span>
                  </div>

                  <p className="text-sm text-gray-700">{selectedVenue.description}</p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-medium">Capacity</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedVenue.capacity}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs font-medium">Price Range</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedVenue.price}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVenue.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            ) : (
              // Venue Legend
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Event Venues</h3>
                <div className="space-y-3">
                  {venues.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => setSelectedVenue(venue)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`${venue.color} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 relative`}>
                        {venue.id}
                        {venue.verified && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full overflow-hidden border-2 border-white">
                            <img src="/digo.png" alt="Verified" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {venue.name}
                        </p>
                        <p className="text-xs text-gray-500">Up to {venue.capacity} people</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <img src="/digo.png" alt="Digo" className="w-4 h-4" />
                    <span>= Digo Verified Venue</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Request Modal */}
        {showBookingModal && selectedVenue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Request Booking</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedVenue.name}</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Event Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.eventDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={bookingForm.eventTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Attendees *
                      </label>
                      <input
                        type="number"
                        required
                        value={bookingForm.attendees}
                        onChange={(e) => setBookingForm({ ...bookingForm, attendees: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Type *
                      </label>
                      <select
                        required
                        value={bookingForm.eventType}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="networking">Networking Event</option>
                        <option value="seminar">Seminar</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Requirements</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Setup Requirements
                    </label>
                    <textarea
                      value={bookingForm.setupRequirements}
                      onChange={(e) => setBookingForm({ ...bookingForm, setupRequirements: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Theater style seating, podium, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catering Needs
                    </label>
                    <textarea
                      value={bookingForm.cateringNeeds}
                      onChange={(e) => setBookingForm({ ...bookingForm, cateringNeeds: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Coffee and lunch for 50 people"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AV & Tech Needs
                    </label>
                    <textarea
                      value={bookingForm.avNeeds}
                      onChange={(e) => setBookingForm({ ...bookingForm, avNeeds: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Projector, wireless mics, recording equipment"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Message
                    </label>
                    <textarea
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Any other details or questions..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
