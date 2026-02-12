import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, DollarSign, X, ArrowLeft, Star, Check } from 'lucide-react';
import Header from '../components/Header';

export default function VenueDiscoveryPage() {
  const [selectedVenue, setSelectedVenue] = useState(null);

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
      position: { top: '32%', left: '28%' },
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
      position: { top: '52%', left: '52%' },
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
      position: { top: '42%', left: '34%' },
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
      position: { top: '48%', left: '45%' },
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
      position: { top: '45%', left: '40%' },
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
      position: { top: '65%', left: '68%' },
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
      position: { top: '38%', left: '32%' },
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Venues</h1>
              <p className="text-lg text-gray-600">Find the perfect venue for your next event in the SF Bay Area</p>
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

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 h-[600px] relative overflow-hidden">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Join us at the heart of</h2>
                <h3 className="text-3xl font-bold text-gray-900">Silicon Valley</h3>
              </div>

              {/* SF Bay Area Map Representation */}
              <div className="relative h-[480px] bg-gradient-to-br from-blue-100 via-blue-50 to-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden">
                {/* California shape representation */}
                <div className="absolute inset-0">
                  {/* San Francisco Bay (water) */}
                  <div className="absolute top-[20%] left-[15%] w-[35%] h-[40%] bg-blue-200 opacity-40 rounded-full transform -rotate-12"></div>

                  {/* Peninsula (land) */}
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-gray-100 to-transparent"></div>

                  {/* Diagonal pattern for land/water boundary */}
                  <div
                    className="absolute top-[15%] left-[10%] w-[25%] h-[70%] opacity-20"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #9ca3af 10px, #9ca3af 12px)'
                    }}
                  ></div>
                </div>

                {/* Venue Markers */}
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => setSelectedVenue(venue)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 group z-10"
                    style={{ top: venue.position.top, left: venue.position.left }}
                  >
                    <div className={`relative ${venue.color} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow`}>
                      {venue.id}
                      {venue.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {venue.name}
                    </div>
                  </button>
                ))}
              </div>
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
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          <Check className="w-3 h-3" />
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

                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
                    Request Booking
                  </button>
                </div>
              </div>
            ) : (
              // Venue Legend
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bay Area Venues</h3>
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
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <Check className="w-2 h-2 text-white" strokeWidth={3} />
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
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" strokeWidth={3} />
                    </div>
                    <span>= Verified Venue</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
