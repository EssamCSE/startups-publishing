# 🚀 Startup Publishing Platform

A modern web application for publishing and discovering startup information, built with Next.js 15, Sanity CMS, and NextAuth for authentication.

## ✨ Features

- 🔐 Secure authentication with NextAuth
- 📝 Rich content management with Sanity CMS
- 🎨 Modern UI with Tailwind CSS
- 🌓 Dark/Light mode support
- 🔍 Search functionality
- 📱 Responsive design
- 🚀 Startup profile creation and management

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js 15.3.1
- **Content Management:** Sanity v3
- **Authentication:** NextAuth v5
- **Styling:**
  - Tailwind CSS
  - Radix UI Components
  - Lucide React Icons
- **Form Validation:** Zod
- **Markdown Support:** Markdown-it
- **Development Tools:**
  - TypeScript
  - ESLint
  - Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- Sanity account (for CMS)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd startups-publishing
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
```

4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
├── app/                   # Next.js app directory
│   ├── (root)/           # Root layout and pages
│   ├── api/              # API routes
│   ├── auth/             # Authentication related files
│   └── studio/           # Sanity Studio integration
├── components/           # React components
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   └── ...              # Other components
├── lib/                  # Utility functions and shared logic
├── public/              # Static assets
├── sanity/              # Sanity configuration and schemas
│   ├── schemas/         # Content type definitions
│   └── lib/             # Sanity utility functions
└── styles/              # Global styles and Tailwind config
```

## 🔧 Configuration

- `next.config.ts` - Next.js configuration
- `sanity.config.ts` - Sanity Studio configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🚀 Deployment

The application can be easily deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

## 📝 License

Essam

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
