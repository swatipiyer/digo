import { useState } from 'react';
import { FileText, Mail, DollarSign, Copy, Download, Check } from 'lucide-react';
import Header from '../components/Header';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('event-data');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [reportData, setReportData] = useState({
    eventName: '',
    eventDate: '',
    totalRegistered: '',
    totalAttended: '',
    engineers: '',
    founders: '',
    students: '',
    dataScientists: '',
    socialMentions: '',
    impressions: '',
    linkedinPosts: '',
    videoViews: '',
    slideDownloads: '',
  });

  const handleDataChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleExport = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showSuccessToast('File downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <TabButton
            active={activeTab === 'event-data'}
            onClick={() => setActiveTab('event-data')}
            icon={FileText}
            label="Event Data"
          />
          <TabButton
            active={activeTab === 'attendee-email'}
            onClick={() => setActiveTab('attendee-email')}
            icon={Mail}
            label="Attendee Email"
          />
          <TabButton
            active={activeTab === 'sponsor-report'}
            onClick={() => setActiveTab('sponsor-report')}
            icon={DollarSign}
            label="Sponsor Report"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'event-data' && (
          <EventDataTab data={reportData} onChange={handleDataChange} />
        )}
        {activeTab === 'attendee-email' && (
          <AttendeeEmailTab data={reportData} onCopy={handleCopy} onExport={handleExport} />
        )}
        {activeTab === 'sponsor-report' && (
          <SponsorReportTab data={reportData} onCopy={handleCopy} onExport={handleExport} />
        )}
      </main>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-grow-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
        active
          ? 'border-teal-600 text-teal-600 font-semibold'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function EventDataTab({ data, onChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Event Metrics</h2>
      <p className="text-sm text-gray-600 mb-6">
        Input your event data to generate attendee emails and sponsor reports
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Details */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Event Name *
          </label>
          <input
            type="text"
            value={data.eventName}
            onChange={(e) => onChange('eventName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="Frontier AI & AI Agents"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            value={data.eventDate}
            onChange={(e) => onChange('eventDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Total Registered
          </label>
          <input
            type="number"
            value={data.totalRegistered}
            onChange={(e) => onChange('totalRegistered', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Total Attended
          </label>
          <input
            type="number"
            value={data.totalAttended}
            onChange={(e) => onChange('totalAttended', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="120"
          />
        </div>

        {/* Demographics */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Engineers
          </label>
          <input
            type="number"
            value={data.engineers}
            onChange={(e) => onChange('engineers', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="45"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Founders
          </label>
          <input
            type="number"
            value={data.founders}
            onChange={(e) => onChange('founders', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Students
          </label>
          <input
            type="number"
            value={data.students}
            onChange={(e) => onChange('students', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Data Scientists
          </label>
          <input
            type="number"
            value={data.dataScientists}
            onChange={(e) => onChange('dataScientists', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="25"
          />
        </div>

        {/* Engagement Metrics */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Social Mentions
          </label>
          <input
            type="number"
            value={data.socialMentions}
            onChange={(e) => onChange('socialMentions', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Impressions
          </label>
          <input
            type="number"
            value={data.impressions}
            onChange={(e) => onChange('impressions', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            LinkedIn Posts
          </label>
          <input
            type="number"
            value={data.linkedinPosts}
            onChange={(e) => onChange('linkedinPosts', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="75"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Video Views
          </label>
          <input
            type="number"
            value={data.videoViews}
            onChange={(e) => onChange('videoViews', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="2500"
          />
        </div>
      </div>
    </div>
  );
}

function AttendeeEmailTab({ data, onCopy, onExport }) {
  const emailContent = `Dear Attendee,

Thank you for attending ${data.eventName || '[Event Name]'}!

We had an incredible turnout with ${data.totalAttended || 'many'} attendees joining us on ${data.eventDate || '[Date]'}. Your participation made this event a success!

Event Highlights:
• ${data.totalAttended || 'N/A'} attendees from diverse backgrounds
• ${data.engineers || 'N/A'} engineers, ${data.founders || 'N/A'} founders, ${data.students || 'N/A'} students, and ${data.dataScientists || 'N/A'} data scientists
• ${data.socialMentions || 'N/A'} social media mentions reaching ${data.impressions || 'N/A'} impressions
• ${data.videoViews || 'N/A'} video views and ${data.linkedinPosts || 'N/A'} LinkedIn posts

We'd love to hear your feedback! Please take 2 minutes to complete our survey:
[Survey Link]

Stay connected:
• Follow us on LinkedIn and Twitter
• Join our community group
• Check out event recordings and slides

Looking forward to seeing you at our next event!

Best regards,
The Digo Team`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Attendee Thank You Email</h2>
      <p className="text-sm text-gray-600 mb-6">
        Generated email template based on your event data
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
          {emailContent}
        </pre>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onCopy(emailContent)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Email
        </button>
        <button
          onClick={() => onExport(emailContent, `${data.eventName || 'event'}_attendee_email.txt`)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export to File
        </button>
      </div>
    </div>
  );
}

function SponsorReportTab({ data, onCopy, onExport }) {
  const showUpRate = data.totalRegistered && data.totalAttended
    ? ((parseInt(data.totalAttended) / parseInt(data.totalRegistered)) * 100).toFixed(1)
    : 'N/A';

  const reportContent = `SPONSOR REPORT
${data.eventName || '[Event Name]'}
${data.eventDate || '[Event Date]'}

EVENT OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Registered:     ${data.totalRegistered || 'N/A'}
Total Attended:       ${data.totalAttended || 'N/A'}
Show-up Rate:         ${showUpRate}%

ATTENDEE DEMOGRAPHICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Engineers:            ${data.engineers || 'N/A'} (${data.engineers && data.totalAttended ? ((parseInt(data.engineers) / parseInt(data.totalAttended)) * 100).toFixed(1) : 'N/A'}%)
Founders:             ${data.founders || 'N/A'} (${data.founders && data.totalAttended ? ((parseInt(data.founders) / parseInt(data.totalAttended)) * 100).toFixed(1) : 'N/A'}%)
Students:             ${data.students || 'N/A'} (${data.students && data.totalAttended ? ((parseInt(data.students) / parseInt(data.totalAttended)) * 100).toFixed(1) : 'N/A'}%)
Data Scientists:      ${data.dataScientists || 'N/A'} (${data.dataScientists && data.totalAttended ? ((parseInt(data.dataScientists) / parseInt(data.totalAttended)) * 100).toFixed(1) : 'N/A'}%)

ENGAGEMENT METRICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Social Mentions:      ${data.socialMentions || 'N/A'}
Total Impressions:    ${data.impressions || 'N/A'}
LinkedIn Posts:       ${data.linkedinPosts || 'N/A'}
Video Views:          ${data.videoViews || 'N/A'}
Slide Downloads:      ${data.slideDownloads || 'N/A'}

ROI SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cost per Attendee:    [Based on sponsorship tier]
Lead Generation:      ${data.totalAttended || 'N/A'} qualified leads
Engagement Score:     High (${data.impressions || 'N/A'} impressions)

Thank you for your sponsorship and support in making this event a success!`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sponsor Report</h2>
      <p className="text-sm text-gray-600 mb-6">
        Comprehensive report with attendance, demographics, and ROI metrics
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
          {reportContent}
        </pre>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onCopy(reportContent)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Report
        </button>
        <button
          onClick={() => onExport(reportContent, `${data.eventName || 'event'}_sponsor_report.txt`)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export to File
        </button>
      </div>
    </div>
  );
}
