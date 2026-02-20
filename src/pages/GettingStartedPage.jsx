import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  ChevronRight,
  Users,
  Briefcase,
  Settings,
  BookOpen,
  Mic,
  Code,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Eye,
  Heart,
  Calendar,
  Mail,
  MapPin,
  Megaphone,
  Search,
} from 'lucide-react';

const audienceCards = [
  {
    id: 'participants',
    label: 'Participants',
    icon: Users,
    gradient: 'from-violet-600 to-indigo-700',
    shadowColor: 'shadow-violet-600/20',
    tagline: 'Walk away with more than memories',
    description:
      'Every event on digo is designed to deliver real, lasting value. Access speaker slides, workshop materials, hackathon repos, and session recordings long after the event ends.',
    benefits: [
      { icon: BookOpen, text: 'Webinar materials, slides, and resources delivered to your inbox' },
      { icon: Code, text: 'Hackathon starter kits, repos, and project showcases you can build on' },
      { icon: Mic, text: 'Speaker session recordings and curated follow-up content' },
      { icon: Heart, text: 'Connect with speakers, mentors, and peers beyond the event' },
    ],
  },
  {
    id: 'sponsors',
    label: 'Sponsors',
    icon: Briefcase,
    gradient: 'from-blue-600 to-cyan-600',
    shadowColor: 'shadow-blue-600/20',
    tagline: 'Know exactly what your sponsorship delivers',
    description:
      'Stop guessing whether your sponsorship dollars made an impact. digo gives sponsors transparent analytics on reach, engagement, and audience sentiment so you can make data-driven decisions.',
    benefits: [
      { icon: BarChart3, text: 'Real-time dashboards showing attendee engagement with your brand' },
      { icon: Target, text: 'Audience demographics and interest breakdowns per event' },
      { icon: Eye, text: 'Impression tracking across emails, landing pages, and media kits' },
      { icon: TrendingUp, text: 'ROI reports comparing sponsorship tiers and event types' },
    ],
  },
  {
    id: 'organizers',
    label: 'Organizers',
    icon: Settings,
    gradient: 'from-indigo-600 to-blue-700',
    shadowColor: 'shadow-indigo-600/20',
    tagline: 'Everything you need, nothing you don\'t',
    description:
      'From your first meetup to a 5,000-person conference, digo gives you the tools to create, promote, and manage events without stitching together a dozen different platforms.',
    benefits: [
      { icon: Calendar, text: 'Event builder with sessions, speakers, tickets, and landing pages' },
      { icon: Mail, text: 'Drag-and-drop email builder with templates and scheduling' },
      { icon: MapPin, text: 'Venue discovery with real-time availability and instant booking' },
      { icon: Megaphone, text: 'Marketing tools, media kits, and branded promotional assets' },
    ],
  },
];

const platformFeatures = [
  {
    icon: Search,
    title: 'Event Discovery',
    description: 'Find events that match your interests across categories, locations, and communities.',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    title: 'Email Builder',
    description: 'Design branded event invitations and follow-ups with our Canva-like email builder.',
    color: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
  },
  {
    icon: MapPin,
    title: 'Venue Discovery',
    description: 'Browse verified venues with capacity details and instant booking requests.',
    color: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
  },
  {
    icon: Megaphone,
    title: 'Marketing Tools',
    description: 'Generate media kits, promotional assets, and shareable landing pages.',
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
  },
  {
    icon: Users,
    title: 'Group Management',
    description: 'Organize communities, manage RSVPs, and keep your attendees engaged.',
    color: 'bg-sky-50 text-sky-600',
    border: 'border-sky-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Track engagement, measure impact, and gain insights for every stakeholder.',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-20 left-[15%] w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-[20%] w-3 h-3 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-[25%] w-2.5 h-2.5 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-blue-100 mb-8">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Where participants, sponsors, and organizers all win</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Events That{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent">
                  Deliver Value
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400/40 to-indigo-400/40 blur-sm rounded-full" />
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
              Participants take home real materials. Sponsors see measurable impact.
              Organizers get powerful tools. digo makes every event worth showing up to.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 font-semibold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:bg-blue-50 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <button
                type="button"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-4 h-4 fill-white" />
                </span>
                Watch Demo
              </button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-blue-200/70">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                Free to start
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 80L60 74.7C120 69.3 240 58.7 360 53.3C480 48 600 48 720 53.3C840 58.7 960 69.3 1080 69.3C1200 69.3 1320 58.7 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ====== VALUE FOR EVERYONE ====== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Built for Everyone
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Value for Every Seat at the Table
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Whether you're attending, sponsoring, or organizing -- digo ensures everyone
              walks away with something meaningful.
            </p>
          </div>

          <div className="space-y-20">
            {audienceCards.map((audience, index) => {
              const AudienceIcon = audience.icon;
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={audience.id}
                  className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}
                >
                  {/* Text side */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-4">
                      <AudienceIcon className="w-4 h-4" />
                      For {audience.label}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {audience.tagline}
                    </h3>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8">
                      {audience.description}
                    </p>
                    <div className="space-y-4">
                      {audience.benefits.map((benefit) => {
                        const BenefitIcon = benefit.icon;
                        return (
                          <div key={benefit.text} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <BenefitIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-gray-600 leading-relaxed">{benefit.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual side */}
                  <div className="flex-1 w-full max-w-lg">
                    <div className={`relative bg-gradient-to-br ${audience.gradient} rounded-3xl p-8 sm:p-10 shadow-2xl ${audience.shadowColor} overflow-hidden`}>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                      </div>
                      <div className="relative">
                        <AudienceIcon className="w-12 h-12 text-white/80 mb-6" />
                        <h4 className="text-2xl font-bold text-white mb-3">{audience.label}</h4>
                        <p className="text-white/70 leading-relaxed mb-6">{audience.tagline}</p>
                        <div className="space-y-3">
                          {audience.benefits.slice(0, 3).map((benefit) => (
                            <div key={benefit.text} className="flex items-center gap-2 text-white/90">
                              <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0" />
                              <span className="text-sm">{benefit.text.split(',')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== PLATFORM FEATURES ====== */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
              The Platform
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Everything Under One Roof
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              No more juggling spreadsheets, email tools, and analytics dashboards. digo brings it all together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group relative bg-white border ${feature.border} rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to Make Every Event{' '}
            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Count
            </span>
            ?
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Join organizers, sponsors, and participants who are already getting more
            out of every event. Start free, upgrade when you're ready.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 font-semibold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:bg-blue-50 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/digo.png" alt="Digo" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold text-white">digo</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
                The event platform where participants, sponsors, and organizers all get real value.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/explore" className="hover:text-white transition-colors duration-200">Discover Events</Link></li>
                <li><Link to="/venues" className="hover:text-white transition-colors duration-200">Venue Discovery</Link></li>
                <li><Link to="/marketing" className="hover:text-white transition-colors duration-200">Marketing Tools</Link></li>
                <li><Link to="/calendar" className="hover:text-white transition-colors duration-200">Calendar</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Community</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/groups" className="hover:text-white transition-colors duration-200">Groups</Link></li>
                <li><Link to="/organizers" className="hover:text-white transition-colors duration-200">Organizers</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors duration-200">Services</Link></li>
                <li><Link to="/become-speaker" className="hover:text-white transition-colors duration-200">Become a Speaker</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="hover:text-white transition-colors duration-200 cursor-pointer">About</span></li>
                <li><span className="hover:text-white transition-colors duration-200 cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white transition-colors duration-200 cursor-pointer">Careers</span></li>
                <li><span className="hover:text-white transition-colors duration-200 cursor-pointer">Contact</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} digo. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
