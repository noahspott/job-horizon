# Job Horizon

A modern AI-powered platform that streamlines the job application process. Built with cutting-edge technologies, Job Horizon helps job seekers create tailored applications by automatically generating resumes and cover letters that match specific job requirements.

## Core Technologies

- **Next.js 14** - React framework with server components and app router
- **Anthropic Claude 3** - Advanced AI for intelligent content generation
- **Supabase** - PostgreSQL database with real-time capabilities and auth
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling framework

## Key Features

### AI-Powered Content Generation

- Intelligent parsing of job descriptions
- Automated resume tailoring based on requirements
- Dynamic cover letter generation
- Context-aware content optimization

### Profile Management

- Comprehensive professional profile builder
- Skills and experience tracking
- Education and certification management
- Portfolio integration

### Application Tracking

- Centralized application monitoring
- Status tracking and updates
- Follow-up reminders
- Communication history

## Technical Architecture

### Frontend

- Server and client components with Next.js 14
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- Modern UI with custom animations

### Backend

- Serverless architecture with Next.js API routes
- Supabase for data persistence and real-time updates
- Row Level Security (RLS) for data protection
- JWT-based authentication

### AI Integration

- Claude 3 API for natural language processing
- Intelligent content analysis and generation
- Context-aware response optimization
- Automated formatting and styling

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development

### Prerequisites

- Node.js 18+
- Supabase account
- Anthropic API key

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
ANTHROPIC_API_KEY=your_claude_api_key
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Claude API Reference](https://docs.anthropic.com/claude/reference)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
