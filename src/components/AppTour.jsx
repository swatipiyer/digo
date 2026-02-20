import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Search, Calendar, Users, MapPin, Mic, Share2, Download, Grid3x3 } from 'lucide-react';

const TOUR_STEPS = [
  {
    title: 'Welcome to Digo! 👋',
    description: 'Your all-in-one platform for discovering events, connecting with communities, and managing your event journey.',
    preview: 'welcome',
  },
  {
    title: 'Discover Events',
    description: 'Browse upcoming events, workshops, and meetups. Use the search to find exactly what you\'re looking for.',
    preview: 'discover',
  },
  {
    title: 'View Calendar',
    description: 'See all events in a calendar view. Plan your schedule and never miss an event.',
    preview: 'calendar',
  },
  {
    title: 'Join Groups',
    description: 'Connect with like-minded people in groups based on your interests and professional goals.',
    preview: 'groups',
  },
  {
    title: 'Event Details',
    description: 'Click on any event to see full details including speakers, sessions, videos, and resources.',
    preview: 'event',
  },
  {
    title: 'Quick Actions',
    description: 'Share events, add to your calendar, get directions, and access resources with one click.',
    preview: 'actions',
  },
];

const TourPreview = ({ type }) => {
  switch (type) {
    case 'welcome':
      return (
        <div className="bg-gray-900 p-8 rounded-lg text-white text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold mb-2">digo</h3>
          <p className="text-sm opacity-90">Grow your network, cultivate connections</p>
        </div>
      );

    case 'discover':
      return (
        <div className="bg-dew p-4 rounded-lg">
          <div className="bg-white rounded-lg p-3 mb-3 border border-mist">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-stem" />
              <div className="h-2 bg-mist rounded flex-1"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-brand rounded-lg p-3">
                <div className="w-4 h-4 bg-spring rounded-full mb-2"></div>
                <div className="h-2 bg-mist rounded mb-1.5"></div>
                <div className="h-2 bg-mist rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'calendar':
      return (
        <div className="bg-white rounded-lg p-4 border border-mist">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <Calendar className="w-4 h-4 text-growth" />
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i % 7 === 3 ? 'bg-growth' : i % 5 === 0 ? 'bg-spring' : 'bg-mist'
                }`}
              ></div>
            ))}
          </div>
        </div>
      );

    case 'groups':
      return (
        <div className="bg-dew p-4 rounded-lg">
          {[1, 2].map((i) => (
            <div key={i} className="card-brand rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-growth" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded mb-1 w-2/3"></div>
                  <div className="h-1.5 bg-mist rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="h-6 bg-gray-900 rounded flex-1"></div>
                <div className="h-6 bg-mist rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'event':
      return (
        <div className="bg-dew p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="col-span-2 bg-white rounded-lg p-3 border border-mist">
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 bg-mist rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-2 border border-mist flex items-center gap-2">
              <Mic className="w-4 h-4 text-growth" />
              <div className="flex-1">
                <div className="h-2 bg-mist rounded mb-1"></div>
                <div className="h-1.5 bg-mist rounded w-2/3"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2 border border-mist flex items-center gap-2">
              <Mic className="w-4 h-4 text-growth" />
              <div className="flex-1">
                <div className="h-2 bg-mist rounded mb-1"></div>
                <div className="h-1.5 bg-mist rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'actions':
      return (
        <div className="bg-white rounded-lg p-4 border border-mist">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-spring rounded-lg p-3 flex flex-col items-center gap-1">
              <Share2 className="w-5 h-5 text-forest" />
              <span className="text-xs text-forest font-medium">Share</span>
            </div>
            <div className="bg-spring rounded-lg p-3 flex flex-col items-center gap-1">
              <Calendar className="w-5 h-5 text-forest" />
              <span className="text-xs text-forest font-medium">Calendar</span>
            </div>
            <div className="bg-spring rounded-lg p-3 flex flex-col items-center gap-1">
              <Download className="w-5 h-5 text-forest" />
              <span className="text-xs text-forest font-medium">Resources</span>
            </div>
            <div className="bg-spring rounded-lg p-3 flex flex-col items-center gap-1">
              <MapPin className="w-5 h-5 text-forest" />
              <span className="text-xs text-forest font-medium">Directions</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default function AppTour({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(true);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setShow(false);
    localStorage.setItem('digo_tour_completed', 'true');
    if (onComplete) onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!show) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" />

      {/* Tour Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-grow-in">
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-stem hover:text-forest transition-colors"
            aria-label="Skip tour"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex gap-1">
              {TOUR_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= currentStep ? 'bg-growth' : 'bg-mist'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            {/* Preview */}
            <div className="mb-6">
              <TourPreview type={step.preview} />
            </div>

            {/* Text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-forest mb-3">
              {step.title}
            </h2>
            <p className="text-base sm:text-lg text-stem leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleSkip}
              className="text-sm font-medium text-stem hover:text-forest transition-colors"
            >
              Skip tour
            </button>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-mist rounded-lg text-sm font-medium text-forest hover:border-growth hover:bg-mist transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                {currentStep < TOUR_STEPS.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          </div>

          {/* Step indicator */}
          <div className="text-center mt-4 text-sm text-stem">
            Step {currentStep + 1} of {TOUR_STEPS.length}
          </div>
        </div>
      </div>
    </>
  );
}
