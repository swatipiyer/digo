import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, Users, DollarSign, Mic, Tag,
  Plus, X, CheckCircle, ClipboardList, Building2, Clock,
  Target, Lightbulb, ChevronDown, ChevronUp, ChevronRight,
  Eye, Globe, Video,
} from 'lucide-react';

const SAMPLE_PLANS = [
  {
    id: 'ai-summit-2026',
    name: 'SF AI Summit 2026',
    description: 'A one-day conference exploring the intersection of AI, product strategy, and enterprise software. Featuring talks from industry leaders at Meta, Snowflake, and OpenAI.',
    eventType: 'in-person',
    format: 'Conference',
    location: 'San Francisco, CA',
    venue: 'The Midway SF',
    expectedAttendees: 250,
    targetDate: '2026-04-15',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    targetAudience: 'Software engineers, Product managers, Founders, AI researchers',
    topics: [
      { title: 'Building with LLMs in Production', description: 'Best practices for deploying language models at scale' },
      { title: 'AI Agent Architectures', description: 'Multi-agent systems and orchestration patterns' },
      { title: 'Product Strategy in the AI Era', description: 'How AI is changing product development cycles' },
      { title: 'Responsible AI & Governance', description: 'Enterprise guardrails, bias detection, and compliance' },
    ],
    organizers: [
      { name: 'Swati Patel', role: 'Lead Organizer', email: 'swati@digo.app' },
      { name: 'Jordan Lee', role: 'Program Director', email: 'jordan@digo.app' },
      { name: 'Maya Torres', role: 'Logistics Lead', email: 'maya@digo.app' },
    ],
    speakers: [
      { name: 'Nayam Rahman', topic: 'Model Context Protocol (MCP)', company: 'Meta' },
      { name: 'Okhtay Khasmammadov', topic: 'AI Agent Building with Cortex', company: 'Snowflake' },
      { name: 'Dr. Elena Vasquez', topic: 'Responsible AI at Scale', company: 'OpenAI' },
      { name: 'Marcus Chen', topic: 'LLMs in Production', company: 'Anthropic' },
    ],
    sponsors: [
      { name: 'Snowflake', tier: 'Platinum', contribution: '$15,000' },
      { name: 'Meta', tier: 'Gold', contribution: '$10,000' },
      { name: 'Anthropic', tier: 'Gold', contribution: '$10,000' },
      { name: 'Vercel', tier: 'Silver', contribution: '$5,000' },
    ],
    budget: [
      { category: 'Venue', estimated: 8000, notes: 'The Midway SF — full day rental' },
      { category: 'Catering', estimated: 5000, notes: 'Lunch + coffee breaks for 250' },
      { category: 'A/V Equipment', estimated: 3500, notes: 'Sound, projectors, live streaming' },
      { category: 'Marketing', estimated: 2000, notes: 'Paid social, email campaigns' },
      { category: 'Speaker Travel', estimated: 4000, notes: 'Flights + hotels for 2 speakers' },
      { category: 'Swag & Printing', estimated: 1500, notes: 'Badges, lanyards, t-shirts' },
    ],
    milestones: [
      { date: '2026-01-15', task: 'Secure venue', status: 'done' },
      { date: '2026-02-01', task: 'Confirm speakers', status: 'done' },
      { date: '2026-02-15', task: 'Lock in sponsors', status: 'done' },
      { date: '2026-03-01', task: 'Open registration', status: 'done' },
      { date: '2026-03-15', task: 'Send marketing emails', status: 'in-progress' },
      { date: '2026-04-01', task: 'Finalize schedule & run-of-show', status: 'pending' },
      { date: '2026-04-10', task: 'Final vendor confirmations', status: 'pending' },
      { date: '2026-04-15', task: 'Event day', status: 'pending' },
    ],
  },
  {
    id: 'devtools-workshop',
    name: 'DevTools Workshop Series',
    description: 'A hands-on workshop series teaching developers how to build AI-powered developer tools. Three sessions covering code generation, testing automation, and debugging assistants.',
    eventType: 'hybrid',
    format: 'Workshop',
    location: 'Menlo Park, CA + Online',
    venue: 'Hacker Dojo',
    expectedAttendees: 80,
    targetDate: '2026-05-10',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    targetAudience: 'Full-stack developers, DevOps engineers, Tech leads',
    topics: [
      { title: 'AI-Powered Code Generation', description: 'Build a VS Code extension that generates code from natural language' },
      { title: 'Automated Testing with AI', description: 'Create test suites that write themselves' },
      { title: 'Intelligent Debugging', description: 'Build an AI debugging assistant that identifies root causes' },
    ],
    organizers: [
      { name: 'Alex Rivera', role: 'Lead Organizer', email: 'alex@digo.app' },
      { name: 'Kim Nguyen', role: 'Workshop Coordinator', email: 'kim@digo.app' },
    ],
    speakers: [
      { name: 'Sarah Kim', topic: 'AI-Powered Code Generation', company: 'GitHub' },
      { name: 'Raj Patel', topic: 'Automated Testing with AI', company: 'Vercel' },
      { name: 'Lisa Zhang', topic: 'Intelligent Debugging', company: 'Sentry' },
    ],
    sponsors: [
      { name: 'GitHub', tier: 'Gold', contribution: '$7,500' },
      { name: 'Sentry', tier: 'Silver', contribution: '$3,000' },
    ],
    budget: [
      { category: 'Venue', estimated: 2000, notes: 'Hacker Dojo — 3 evenings' },
      { category: 'Catering', estimated: 1500, notes: 'Pizza + drinks x3 sessions' },
      { category: 'Streaming Setup', estimated: 1000, notes: 'Zoom Pro + OBS setup' },
      { category: 'Marketing', estimated: 500, notes: 'Meetup.com promotion' },
    ],
    milestones: [
      { date: '2026-03-01', task: 'Book venue', status: 'done' },
      { date: '2026-03-15', task: 'Confirm workshop leads', status: 'done' },
      { date: '2026-04-01', task: 'Open registration', status: 'done' },
      { date: '2026-04-20', task: 'Prepare workshop materials', status: 'in-progress' },
      { date: '2026-05-05', task: 'Dry run sessions', status: 'pending' },
      { date: '2026-05-10', task: 'Workshop Day 1', status: 'pending' },
    ],
  },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PlanCard({ plan }) {
  const totalBudget = plan.budget.reduce((sum, item) => sum + item.estimated, 0);
  const completedMilestones = plan.milestones.filter(m => m.status === 'done').length;
  const progress = Math.round((completedMilestones / plan.milestones.length) * 100);

  return (
    <Link to={`/event-plan/${plan.id}`} className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
      <div className="aspect-[3/1] relative">
        <img src={plan.coverImage} alt={plan.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{plan.format}</span>
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full capitalize">{plan.eventType}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{plan.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-900">{formatDate(plan.targetDate)}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-900">{plan.expectedAttendees} expected</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Mic className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-900">{plan.speakers.length} speakers</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <DollarSign className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-900">${totalBudget.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-500">Progress</span>
              <span className="text-xs font-bold text-violet-600">{progress}%</span>
            </div>
            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-violet-600 transition-colors flex items-center gap-1">
            View plan <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PlanDetail() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('overview');
  const plan = SAMPLE_PLANS.find(p => p.id === id);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Plan not found.</p>
          <Link to="/event-plan" className="text-blue-600 hover:underline text-sm">Back to Plans</Link>
        </div>
      </div>
    );
  }

  const totalBudget = plan.budget.reduce((sum, item) => sum + item.estimated, 0);
  const completedMilestones = plan.milestones.filter(m => m.status === 'done').length;
  const progress = Math.round((completedMilestones / plan.milestones.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/event-plan" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft className="w-4 h-4" />
          All Plans
        </Link>

        {/* Header */}
        <div className="rounded-xl overflow-hidden mb-6 relative">
          <img src={plan.coverImage} alt={plan.name} className="w-full aspect-[3/1] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">{plan.format}</span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full capitalize">{plan.eventType}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">{plan.name}</h1>
            <p className="text-white/70 text-sm">{plan.description}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
            <Calendar className="w-4 h-4 text-violet-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-bold text-gray-900">{formatDate(plan.targetDate)}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
            <MapPin className="w-4 h-4 text-violet-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-bold text-gray-900">{plan.location}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
            <Users className="w-4 h-4 text-violet-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Attendees</p>
            <p className="text-sm font-bold text-gray-900">{plan.expectedAttendees}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
            <DollarSign className="w-4 h-4 text-violet-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
            <Target className="w-4 h-4 text-violet-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Progress</p>
            <p className="text-sm font-bold text-violet-600">{progress}%</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'team', label: 'Team & Sponsors', icon: Users },
            { id: 'budget', label: 'Budget', icon: DollarSign },
            { id: 'timeline', label: 'Timeline', icon: Clock },
          ].map(({ id: sId, label, icon: Icon }) => (
            <button
              key={sId}
              type="button"
              onClick={() => setActiveSection(sId)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === sId ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-600" /> Target Audience
              </h3>
              <p className="text-sm text-gray-700">{plan.targetAudience}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-violet-600" /> Topics & Sessions
              </h3>
              <div className="space-y-3">
                {plan.topics.map((topic, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{topic.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mic className="w-4 h-4 text-violet-600" /> Speakers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.speakers.map((speaker, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{speaker.name}</p>
                      <p className="text-xs text-gray-500">{speaker.company} — {speaker.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team & Sponsors */}
        {activeSection === 'team' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-600" /> Organizers
              </h3>
              <div className="space-y-3">
                {plan.organizers.map((org, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {org.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">{org.role}</p>
                    </div>
                    <span className="text-xs text-gray-400">{org.email}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-violet-600" /> Sponsors
              </h3>
              <div className="space-y-3">
                {plan.sponsors.map((sp, i) => {
                  const tierColors = {
                    Platinum: 'bg-gray-100 text-gray-800',
                    Gold: 'bg-amber-50 text-amber-700',
                    Silver: 'bg-gray-50 text-gray-600',
                    Bronze: 'bg-orange-50 text-orange-700',
                  };
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {sp.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{sp.name}</p>
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full mt-0.5 ${tierColors[sp.tier] || 'bg-gray-100 text-gray-600'}`}>{sp.tier}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{sp.contribution}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Budget */}
        {activeSection === 'budget' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-900">Budget Breakdown</h3>
              <span className="text-xl font-bold text-violet-600">${totalBudget.toLocaleString()}</span>
            </div>
            <div className="space-y-3">
              {plan.budget.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.notes}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">${item.estimated.toLocaleString()}</span>
                  <div className="w-20">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-600 rounded-full" style={{ width: `${(item.estimated / totalBudget) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeSection === 'timeline' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Milestones</h3>
            <div className="relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {plan.milestones.map((ms, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      ms.status === 'done' ? 'bg-violet-600 text-white' :
                      ms.status === 'in-progress' ? 'bg-amber-100 text-amber-600 border-2 border-amber-400' :
                      'bg-white border-2 border-gray-300 text-gray-400'
                    }`}>
                      {ms.status === 'done' ? <CheckCircle className="w-4 h-4" /> :
                       ms.status === 'in-progress' ? <Clock className="w-4 h-4" /> :
                       <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className={`text-sm font-semibold ${ms.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{ms.task}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(ms.date)}</p>
                    </div>
                    {ms.status === 'in-progress' && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">IN PROGRESS</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanList() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Event Plans</h1>
            </div>
            <p className="text-gray-600">Plan your events end-to-end — topics, team, sponsors, budget, and timeline</p>
          </div>
          <Link
            to="/event-plan/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Plan
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SAMPLE_PLANS.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CreatePlan() {
  const [activeSection, setActiveSection] = useState('details');
  const [showSuccess, setShowSuccess] = useState(false);
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [eventType, setEventType] = useState('in-person');
  const [eventFormat, setEventFormat] = useState('conference');
  const [location, setLocation] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [topics, setTopics] = useState([{ title: '', description: '' }]);
  const [targetAudience, setTargetAudience] = useState('');
  const [organizers, setOrganizers] = useState([{ name: '', role: 'Lead Organizer', email: '' }]);
  const [speakers, setSpeakers] = useState([{ name: '', topic: '', company: '' }]);
  const [sponsors, setSponsors] = useState([{ name: '', tier: 'Gold', contribution: '' }]);
  const [budgetItems, setBudgetItems] = useState([
    { category: 'Venue', estimated: '', notes: '' },
    { category: 'Catering', estimated: '', notes: '' },
    { category: 'Marketing', estimated: '', notes: '' },
    { category: 'A/V Equipment', estimated: '', notes: '' },
  ]);
  const [milestones, setMilestones] = useState([
    { date: '', task: 'Secure venue', status: 'pending' },
    { date: '', task: 'Confirm speakers', status: 'pending' },
    { date: '', task: 'Open registration', status: 'pending' },
    { date: '', task: 'Send marketing emails', status: 'pending' },
    { date: '', task: 'Event day', status: 'pending' },
  ]);

  const PLAN_SECTIONS = ['details', 'topics', 'team', 'budget', 'timeline'];
  const EVENT_FORMATS = [
    { id: 'conference', label: 'Conference' }, { id: 'meetup', label: 'Meetup' },
    { id: 'workshop', label: 'Workshop' }, { id: 'hackathon', label: 'Hackathon' },
    { id: 'webinar', label: 'Webinar' }, { id: 'networking', label: 'Networking' },
  ];
  const SPONSOR_TIERS = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Community'];
  const totalBudget = budgetItems.reduce((sum, item) => sum + (parseFloat(item.estimated) || 0), 0);

  const handleSubmit = (e) => { e.preventDefault(); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 4000); };

  const sectionProgress = () => {
    let filled = 0;
    if (planName) filled++;
    if (topics.some(t => t.title)) filled++;
    if (organizers.some(o => o.name)) filled++;
    if (budgetItems.some(b => b.estimated)) filled++;
    if (milestones.some(m => m.date)) filled++;
    return Math.round((filled / 5) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/event-plan" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft className="w-4 h-4" />
          All Plans
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">New Event Plan</h1>
          </div>
          <p className="text-gray-600">Plan your event end-to-end</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">Plan Progress</span>
            <span className="text-sm font-bold text-violet-600">{sectionProgress()}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${sectionProgress()}%` }} />
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'details', label: 'Details', icon: Calendar },
            { id: 'topics', label: 'Topics', icon: Lightbulb },
            { id: 'team', label: 'Team', icon: Users },
            { id: 'budget', label: 'Budget', icon: DollarSign },
            { id: 'timeline', label: 'Timeline', icon: Clock },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === id ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {activeSection === 'details' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Event Name *</label>
                <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600" placeholder="e.g. AI Summit 2026" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea value={planDesc} onChange={(e) => setPlanDesc(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 resize-none" placeholder="What is this event about?" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Event Type</label>
                  <div className="flex gap-2">
                    {['in-person', 'online', 'hybrid'].map(t => (
                      <button key={t} type="button" onClick={() => setEventType(t)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${eventType === t ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Format</label>
                  <select value={eventFormat} onChange={(e) => setEventFormat(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600">
                    {EVENT_FORMATS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Target Date</label>
                  <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600" placeholder="City or venue" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Expected Attendees</label>
                  <input type="number" value={expectedAttendees} onChange={(e) => setExpectedAttendees(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-600" placeholder="100" />
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'details' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center py-12">
              <p className="text-gray-500 text-sm">Fill in the details section first, then continue to {activeSection}.</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <button type="button" onClick={() => { const idx = PLAN_SECTIONS.indexOf(activeSection); if (idx > 0) setActiveSection(PLAN_SECTIONS[idx - 1]); }} disabled={activeSection === 'details'} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
            <div className="flex gap-3">
              {activeSection !== 'timeline' ? (
                <button type="button" onClick={() => { const idx = PLAN_SECTIONS.indexOf(activeSection); if (idx < PLAN_SECTIONS.length - 1) setActiveSection(PLAN_SECTIONS[idx + 1]); }} className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">Next</button>
              ) : (
                <button type="submit" className="px-6 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">Save Event Plan</button>
              )}
            </div>
          </div>
        </form>

        {showSuccess && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-violet-400" />
              <p className="text-sm font-semibold">Event plan saved!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventPlanPage() {
  return <PlanList />;
}

export { PlanDetail, CreatePlan };
