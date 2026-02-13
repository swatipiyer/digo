// Share message templates for different platforms and roles

export const generateShareTemplates = (event, role, platform, templateIdx = 0, customUrl = null) => {
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  // Use custom URL (shortened) if provided, otherwise fall back to window.location.href
  const url = customUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const eventName = event.name;
  const location = event.location;

  const templates = {
    attendee: {
      email: [
        {
          subject: `You're invited: ${eventName}`,
          body: `Hi there!\n\nI wanted to share an amazing event I'm attending:\n\n${eventName}\n📅 ${eventDate}\n📍 ${location}\n\n${event.description || 'This is going to be an incredible event with great speakers and networking opportunities.'}\n\nI think you'd really enjoy it! Would love to see you there.\n\nRegister here: ${url}\n\nBest,\n[Your name]`
        },
        {
          subject: `Don't miss ${eventName}!`,
          body: `Hey!\n\nQuick heads up about an event I'm really excited about:\n\n${eventName}\nWhen: ${eventDate}\nWhere: ${location}\n\nI'll be there and thought you might be interested too. It's a great opportunity to learn and network.\n\nCheck it out: ${url}\n\nHope to see you there!`
        }
      ],
      linkedin: [
        `I'm excited to attend ${eventName}! 🎉\n\n📅 ${eventDate}\n📍 ${location}\n\nJoin me at this amazing event to connect with industry leaders and expand your network.\n\nRegister now: ${url}\n\n#Events #Networking #ProfessionalDevelopment`,
        `Looking forward to ${eventName}! 🚀\n\nDate: ${eventDate}\nLocation: ${location}\n\nThis event promises great insights and networking opportunities. If you're in the area, let's connect there!\n\nMore info: ${url}`,
        `Just registered for ${eventName}! 🎯\n\nWhat: ${event.description || 'An incredible event'}\nWhen: ${eventDate}\nWhere: ${location}\n\nWho else is going? Let me know in the comments!\n\n${url}`
      ],
      twitter: [
        `Excited to attend ${eventName}! 🎉\n\n📅 ${eventDate}\n📍 ${location.split(',')[0]}\n\nRegister: ${url}\n\n#TechEvents #Networking`,
        `Can't wait for ${eventName}! 🚀 ${eventDate}\n\nJoin me: ${url}`,
        `See you at ${eventName}! 🎯 ${eventDate}\n\nRegister: ${url}\n\n#Events #Community`
      ],
      instagram: [
        `🎉 Attending ${eventName}\n📅 ${eventDate}\n📍 ${location}\n\n✨ Can't wait for this amazing event!\n\nLink in bio for registration\n\n#Events #Networking #Community #TechEvents`,
        `✨ Mark your calendars!\n\n📌 ${eventName}\n🗓️ ${eventDate}\n📍 ${location}\n\n🎯 See you there!\n\n#Event #Technology #Networking`,
      ]
    },
    speaker: {
      email: [
        {
          subject: `I'm speaking at ${eventName}!`,
          body: `Hi,\n\nI'm excited to announce that I'll be speaking at ${eventName}!\n\nEvent Details:\n📅 ${eventDate}\n📍 ${location}\n\nI'll be sharing insights on ${event.topics || 'cutting-edge topics in the industry'}. It would be great to see you there!\n\nRegister here: ${url}\n\nLooking forward to it!\n[Your name]`
        },
        {
          subject: `Join me at ${eventName}`,
          body: `Hello,\n\nI wanted to let you know I'll be presenting at ${eventName} on ${eventDate}.\n\nVenue: ${location}\n\nI'll be discussing topics that I think you'll find valuable. The event also features other excellent speakers and great networking opportunities.\n\nMore details and registration: ${url}\n\nHope to see you there!`
        }
      ],
      linkedin: [
        `🎤 Excited to announce I'll be speaking at ${eventName}!\n\n📅 ${eventDate}\n📍 ${location}\n\nI'll be sharing insights on ${event.topics || 'innovation and industry trends'}. Looking forward to connecting with fellow professionals and thought leaders.\n\nJoin us: ${url}\n\n#Speaker #Event #Leadership #Innovation`,
        `Honored to be speaking at ${eventName}! 🎯\n\nDate: ${eventDate}\nVenue: ${location}\n\nLooking forward to sharing knowledge and connecting with the community. Hope to see you there!\n\nRegister: ${url}\n\n#PublicSpeaking #ThoughtLeadership`,
        `Speaking at ${eventName}! 🚀\n\n${eventDate} | ${location}\n\nExcited to share insights and connect with amazing people. If you're attending, let's connect!\n\n${url}\n\n#Conference #Speaking #Networking`
      ],
      twitter: [
        `🎤 Speaking at ${eventName}!\n\n📅 ${eventDate}\n📍 ${location.split(',')[0]}\n\nHope to see you there!\n\n${url}\n\n#Speaker #TechTalks`,
        `Excited to present at ${eventName}! 🚀\n${eventDate}\n\nRegister: ${url}\n\n#Speaking #Events`,
        `Join me at ${eventName}! 🎯\nI'll be sharing insights on ${eventDate}\n\n${url}`
      ],
      instagram: [
        `🎤 SPEAKER ANNOUNCEMENT\n\n📌 ${eventName}\n🗓️ ${eventDate}\n📍 ${location}\n\n✨ Excited to share insights with this amazing community!\n\n🔗 Link in bio to register\n\n#Speaker #Event #PublicSpeaking #Inspiration`,
        `🚀 Speaking Alert!\n\nEvent: ${eventName}\nDate: ${eventDate}\nLocation: ${location}\n\n💡 Can't wait to connect and share knowledge!\n\n#SpeakerLife #Events #Community`,
      ]
    },
    organizer: {
      email: [
        {
          subject: `You're invited to ${eventName}`,
          body: `Dear colleague,\n\nWe're thrilled to invite you to ${eventName}!\n\nEvent Details:\n📅 ${eventDate}\n📍 ${location}\n\n${event.description || 'Join us for an incredible event bringing together industry leaders, innovators, and professionals.'}\n\nWhat to Expect:\n• Engaging keynote presentations\n• Networking opportunities\n• Interactive sessions\n• Industry insights\n\nRegister now: ${url}\n\nWe look forward to seeing you there!\n\nBest regards,\nThe ${eventName} Team`
        },
        {
          subject: `Join us for ${eventName} - ${eventDate}`,
          body: `Hello,\n\nWe're excited to announce ${eventName}!\n\nDate: ${eventDate}\nLocation: ${location}\n\n${event.description || 'This event brings together the best minds in the industry for a day of learning, networking, and innovation.'}\n\nWhy attend?\n✓ Learn from industry experts\n✓ Network with peers\n✓ Discover new opportunities\n✓ Gain actionable insights\n\nSecure your spot: ${url}\n\nLimited seats available - register today!\n\nSee you there!`
        }
      ],
      linkedin: [
        `🚀 Join us for ${eventName}!\n\n📅 ${eventDate}\n📍 ${location}\n\n${event.description || 'An incredible event bringing together industry leaders and innovators.'}\n\nWhat you'll gain:\n✓ Expert insights\n✓ Networking opportunities\n✓ Industry knowledge\n✓ Professional growth\n\nRegister now: ${url}\n\nLimited spots available!\n\n#Event #Conference #Networking #ProfessionalDevelopment`,
        `📢 Announcing ${eventName}! 🎯\n\nJoin us on ${eventDate} at ${location} for an unforgettable experience.\n\n${event.description || 'Connect with industry leaders, gain valuable insights, and expand your network.'}\n\nDon't miss out! Register here: ${url}\n\n#Events #Leadership #Innovation`,
        `Mark your calendars! 📅 ${eventName}\n\nWhen: ${eventDate}\nWhere: ${location}\n\nWhy attend?\n• Industry-leading speakers\n• Hands-on workshops\n• Premium networking\n• Actionable takeaways\n\nRegister: ${url}\n\n#Conference #Learning #Community`
      ],
      twitter: [
        `🚀 ${eventName}\n\n📅 ${eventDate}\n📍 ${location.split(',')[0]}\n\nRegister now: ${url}\n\n#Event #Conference #Networking`,
        `Join us for ${eventName}! 🎯\n${eventDate} | ${location.split(',')[0]}\n\nLimited spots available!\n${url}\n\n#TechEvent`,
        `📢 ${eventName} - ${eventDate}\n\nDon't miss out!\n\nRegister: ${url}\n\n#Events #Community`
      ],
      instagram: [
        `🎉 EVENT ANNOUNCEMENT\n\n📌 ${eventName}\n🗓️ ${eventDate}\n📍 ${location}\n\n✨ ${event.description || 'Join us for an amazing event!'}\n\n🎯 Limited spots available\n🔗 Link in bio to register\n\n#Event #Conference #Networking #Community`,
        `✨ SAVE THE DATE ✨\n\n${eventName}\n${eventDate}\n${location}\n\n💡 Don't miss this incredible opportunity!\n\n👉 Link in bio\n\n#Events #Innovation #Networking`,
      ]
    }
  };

  const roleTemplates = templates[role] || templates.attendee;
  const platformTemplates = roleTemplates[platform] || roleTemplates.linkedin;
  const template = platformTemplates[templateIdx % platformTemplates.length];

  return template;
};

export const getPlatformTemplateCount = (role, platform) => {
  const templates = {
    attendee: { email: 2, linkedin: 3, twitter: 3, instagram: 2 },
    speaker: { email: 2, linkedin: 3, twitter: 3, instagram: 2 },
    organizer: { email: 2, linkedin: 3, twitter: 3, instagram: 2 }
  };

  return templates[role]?.[platform] || 1;
};
