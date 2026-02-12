# Digo Event App

A modern event management application built with React, Vite, and Tailwind CSS.

## Features

- **Organizer Dashboard** - Create and manage events, sessions, speakers, and sponsors
- **Speakers Management** - Invite and track speakers with search functionality
- **Sponsors Management** - Add sponsors, view details, and generate reports
- **Reports & Communications** - Generate attendee emails and sponsor reports with export
- **Notifications** - Real-time notification system
- **Feedback** - Collect user feedback

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd digo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
digo/
├── public/
│   └── vite.svg          # Favicon
├── src/
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles with Tailwind
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
