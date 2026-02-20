import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, FileText, Sparkles, Clock, User,
  ThumbsUp, MessageCircle, Share2, Bookmark, ChevronRight,
  PlayCircle, Mic, MapPin, Calendar, Plus,
} from 'lucide-react';

const SUMMARIES = [
  {
    id: 1,
    title: 'Key Takeaways from Product & Business Strategy in AI',
    excerpt: 'An overview of the biggest insights from the AI strategy talks, including how frontier AI models are changing product development and what businesses need to prepare for.',
    author: 'Sarah Chen',
    date: '2026-02-01',
    readTime: '5 min read',
    eventId: 'HkGjx',
    eventName: 'Product & Business Strategy in AI',
    likes: 42,
    comments: 8,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    highlights: [
      'MCP (Model Context Protocol) is the next frontier for AI agent interoperability',
      'Snowflake\'s Cortex platform enables no-code AI agent building for enterprises',
      'The shift from single-model to multi-agent architectures is accelerating',
      'Product managers need to think about AI-native features, not just AI-assisted ones',
    ],
    sessions: [
      { title: 'Model Context Protocol (MCP)', speaker: 'Nayam Rahman' },
      { title: 'Building AI Agents with Snowflake Cortex', speaker: 'Okhtay Khasmammadov' },
    ],
    content: `The recent Product & Business Strategy in AI event brought together some of the sharpest minds working at the intersection of AI and product development. Here are the key takeaways that every product leader should know.

## MCP: The Next Frontier

Nayam Rahman from Meta delivered a compelling presentation on Model Context Protocol (MCP), making a strong case for why interoperability between AI agents will define the next generation of software products. The core insight: we're moving from isolated AI models to interconnected agent ecosystems.

## Enterprise AI Goes No-Code

Okhtay Khasmammadov showcased how Snowflake's Cortex platform is democratizing AI agent building. The platform allows enterprise users to create sophisticated AI workflows without writing code — a game-changer for businesses that want to leverage AI without expanding their engineering teams.

## Multi-Agent Architectures

Perhaps the most forward-looking discussion centered on the shift from single-model to multi-agent architectures. Speakers agreed that the future isn't about one powerful model, but rather orchestrated teams of specialized agents working together.

## What This Means for Product Managers

The overarching message was clear: product managers need to think about AI-native features, not just AI-assisted ones. This means designing products where AI is the core experience, not a bolt-on feature.`,
  },
  {
    id: 2,
    title: 'How AI Agents Are Reshaping Enterprise Software',
    excerpt: 'A deep dive into how autonomous AI agents are being deployed across industries, from customer support to software development, and the architectural patterns that make them work.',
    author: 'Marcus Johnson',
    date: '2026-01-30',
    readTime: '7 min read',
    eventId: 'HkGjx',
    eventName: 'Product & Business Strategy in AI',
    likes: 67,
    comments: 15,
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    highlights: [
      'Agent-based architectures require fundamentally different observability tooling',
      'The "human-in-the-loop" pattern is evolving to "human-on-the-loop"',
      'Enterprise adoption requires robust guardrails and audit trails',
    ],
    sessions: [
      { title: 'AI Agent Workshop', speaker: 'Okhtay Khasmammadov' },
    ],
    content: `Enterprise software is undergoing its most significant transformation since the move to cloud. AI agents — autonomous software entities that can perceive, decide, and act — are at the center of this shift.

## A New Observability Challenge

One of the most practical insights from the workshop was that agent-based architectures require fundamentally different observability tooling. Traditional logging and monitoring falls short when you have autonomous agents making decisions in real-time.

## From Human-in-the-Loop to Human-on-the-Loop

The industry is evolving from requiring human approval for every AI decision to a model where humans monitor and can intervene when needed. This shift enables much faster processing while maintaining safety.

## Enterprise Guardrails

For enterprise adoption, robust guardrails and audit trails are non-negotiable. Companies need to be able to trace every decision an agent makes and understand why it made that decision.`,
  },
  {
    id: 3,
    title: 'The Future of Developer Tooling in the AI Era',
    excerpt: 'From code generation to automated testing, AI is transforming how developers build software. Here are the tools and practices that are leading the charge.',
    author: 'Alex Rivera',
    date: '2026-01-28',
    readTime: '4 min read',
    eventId: 'HkGjx',
    eventName: 'Product & Business Strategy in AI',
    likes: 35,
    comments: 6,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    highlights: [
      'AI-assisted coding is moving beyond autocomplete to full feature generation',
      'Testing and debugging are the next frontier for AI developer tools',
      'The best AI tools augment developer judgment rather than replacing it',
    ],
    sessions: [
      { title: 'Model Context Protocol (MCP)', speaker: 'Nayam Rahman' },
    ],
    content: `The developer tooling landscape is being reshaped by AI at a pace that's hard to keep up with. Here's what's happening and what to watch for.

## Beyond Autocomplete

AI-assisted coding has graduated from simple autocomplete to generating entire features. Tools can now understand context across files, projects, and even organizational codebases to generate meaningful, production-ready code.

## Testing & Debugging: The Next Frontier

While code generation gets the headlines, testing and debugging are where AI developer tools will have the biggest impact. Automated test generation, intelligent debugging, and predictive error detection are all advancing rapidly.

## Augmenting, Not Replacing

The best AI tools augment developer judgment rather than replacing it. They handle the tedious parts — boilerplate, repetitive patterns, documentation — so developers can focus on architecture, design decisions, and creative problem-solving.`,
  },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function SummaryCard({ summary, featured = false }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (featured) {
    return (
      <Link to={`/summaries/${summary.id}`} className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[16/10] lg:aspect-auto">
            <img src={summary.coverImage} alt={summary.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">FEATURED</span>
              <span className="text-xs text-gray-500">{summary.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{summary.title}</h2>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{summary.excerpt}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                {summary.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{summary.author}</p>
                <p className="text-[11px] text-gray-500">{formatDate(summary.date)}</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-blue-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {summary.eventName}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {summary.likes}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {summary.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/summaries/${summary.id}`} className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[16/9]">
        <img src={summary.coverImage} alt={summary.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">{summary.readTime}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{summary.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{summary.excerpt}</p>

        {/* Key highlights */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-[11px] font-semibold text-gray-900 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Key Highlights
          </p>
          <ul className="space-y-1">
            {summary.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center">
              {summary.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs font-medium text-gray-700">{summary.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <ThumbsUp className="w-3.5 h-3.5" />
              {summary.likes}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SummaryDetail() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const summary = SUMMARIES.find(s => String(s.id) === id);

  if (!summary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Summary not found.</p>
          <Link to="/summaries" className="text-blue-600 hover:underline text-sm">Back to Summaries</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/summaries" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft className="w-4 h-4" />
          All Summaries
        </Link>

        <article>
          <div className="rounded-xl overflow-hidden mb-6">
            <img src={summary.coverImage} alt={summary.title} className="w-full aspect-[2/1] object-cover" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{summary.title}</h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                {summary.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{summary.author}</p>
                <p className="text-xs text-gray-500">{formatDate(summary.date)} · {summary.readTime}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button type="button" onClick={() => setLiked(!liked)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${liked ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <ThumbsUp className="w-4 h-4" />
                {summary.likes + (liked ? 1 : 0)}
              </button>
              <button type="button" onClick={() => setSaved(!saved)} className={`p-1.5 rounded-lg ${saved ? 'text-amber-500 bg-amber-50' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}>
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Key Highlights
            </h3>
            <ul className="space-y-2">
              {summary.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          {summary.content && (
            <div className="prose prose-gray max-w-none mb-8">
              {summary.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{paragraph.replace('## ', '')}</h2>;
                }
                return <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
          )}

          {/* Sessions */}
          {summary.sessions?.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Mic className="w-4 h-4 text-gray-500" />
                Related Sessions
              </h3>
              <div className="space-y-2">
                {summary.sessions.map((session, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <PlayCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.title}</p>
                      <p className="text-xs text-gray-500">{session.speaker}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Link */}
          <Link
            to={`/events/${summary.eventId}`}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{summary.eventName}</p>
              <p className="text-xs text-gray-500">View full event details</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
          </Link>
        </article>
      </div>
    </div>
  );
}

function CreateSummary() {
  const [form, setForm] = useState({
    eventId: '',
    title: '',
    excerpt: '',
    content: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Summary Created!</h2>
            <p className="text-gray-600 mb-6">Your summary has been submitted and will appear on the summaries page.</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/summaries" className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                View All Summaries
              </Link>
              <button type="button" onClick={() => { setForm({ eventId: '', title: '', excerpt: '', content: '' }); setSubmitted(false); }} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/summaries" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft className="w-4 h-4" />
          All Summaries
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Summary</h1>
          </div>
          <p className="text-gray-600">Write a recap or share key takeaways from an event</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Event</label>
              <select
                value={form.eventId}
                onChange={(e) => setForm({ ...form, eventId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                required
              >
                <option value="">Select an event...</option>
                <option value="HkGjx">Product & Business Strategy in AI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                placeholder="Key Takeaways from..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm resize-none"
                rows={3}
                placeholder="A brief overview of your summary..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm resize-none"
                rows={12}
                placeholder="Write your summary here. Use ## for headings..."
                required
              />
            </div>

          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Publish Summary
            </button>
            <Link
              to="/summaries"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function SummaryList() {
  const filtered = SUMMARIES;

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
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Summaries</h1>
            </div>
            <p className="text-gray-600">Community-written recaps, insights, and key takeaways from events</p>
          </div>
          <Link
            to="/summaries/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Summary
          </Link>
        </div>


        {/* Featured Summary */}
        {filtered.length > 0 && (
          <div className="mb-8">
            <SummaryCard summary={filtered[0]} featured />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map(summary => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No summaries found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return <SummaryList />;
}

export { SUMMARIES, SummaryDetail, CreateSummary };
