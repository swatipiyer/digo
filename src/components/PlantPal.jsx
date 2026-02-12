import { useState, useEffect } from 'react';
import { Sprout, X, MessageCircle, Sparkles } from 'lucide-react';

const MOTIVATIONAL_MESSAGES = [
  "Keep growing! You're doing great exploring this event.",
  "Remember to network and connect with speakers!",
  "Don't forget to check out the sessions and videos!",
  "Stay curious and keep learning!",
  "You're planting seeds of knowledge today!",
  "Every session is a step toward growth!",
  "Your learning journey is blooming beautifully!",
];

export default function PlantPal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show a random message when component mounts
    const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    setMessage(randomMessage);

    // Auto-open after 2 seconds on first visit
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const getNewMessage = () => {
    const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    setMessage(randomMessage);
  };

  const togglePal = () => {
    if (!isOpen) {
      getNewMessage();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Message bubble */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 mb-2 w-56 sm:w-64 animate-grow-in">
          <div className="bg-white border-2 border-spring rounded-2xl p-3 sm:p-4 shadow-garden-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-stem hover:text-forest transition-colors"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <div className="flex-shrink-0">
                <Sparkles className="w-5 h-5 text-growth" />
              </div>
              <p className="text-sm text-forest leading-relaxed">{message}</p>
            </div>
            <button
              onClick={getNewMessage}
              className="mt-3 text-xs font-medium text-growth hover:text-forest transition-colors"
            >
              Get another tip →
            </button>
          </div>
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-spring transform rotate-45"></div>
        </div>
      )}

      {/* Plant Pal character button */}
      <button
        onClick={togglePal}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-full shadow-garden-lg hover:shadow-garden-md transition-all hover:scale-110 active:scale-95 flex items-center justify-center animate-bloom"
        aria-label="Open Plant Pal assistant"
      >
        {/* Cute plant character */}
        <div className="relative">
          <Sprout className="w-7 h-7 sm:w-8 sm:h-8 text-white transform group-hover:scale-110 transition-transform" />
          {/* Cute eyes */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Notification badge */}
        {!hasShown && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-autumn rounded-full flex items-center justify-center animate-pulse">
            <MessageCircle className="w-2.5 h-2.5 text-white" />
          </div>
        )}

        {/* Hover tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hi! I'm Digby
        </div>
      </button>
    </div>
  );
}
