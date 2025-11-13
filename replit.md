# Shri Shyam Infotech Website

## Overview

This is a modern, full-stack website for Shri Shyam Infotech, a computer training institute in Patna with 17+ years of experience. The platform provides course information, certificate verification, admission inquiries, contact forms, and an AI-powered course advisor chatbot. The application serves both prospective students seeking information about courses and existing students verifying their certificates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (replacing React Router)
- Tailwind CSS for utility-first styling with custom design system

**UI Component System**
- Shadcn/ui component library (New York style variant) with Radix UI primitives
- Custom theme system using CSS variables for consistent branding (navy blue #0A1F44, accent orange #FF6B35, success green #28A745)
- Framer Motion for animations and transitions
- React Hook Form with Zod validation for form management

**State Management**
- TanStack Query (React Query) for server state management
- No global client state library - using React Query's caching capabilities
- Custom query client configuration with disabled refetching for stable data

**Design System**
- Reference-based approach inspired by educational platforms (Coursera, Udemy)
- Typography: Inter/Poppins for headings, Inter/Open Sans for body text
- Layout: max-w-7xl container with responsive spacing scale
- Component patterns: Card-based layouts, accordions for course syllabi, tabs for certificate types

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM module system for modern JavaScript features
- Custom Vite middleware integration for SSR and development mode
- Request logging middleware for API endpoint monitoring

**API Design**
- RESTful endpoints with JSON request/response format
- Zod schema validation for all incoming data
- Error handling with appropriate HTTP status codes
- Endpoints:
  - `POST /api/chat` - AI course advisor interactions
  - `POST /api/verify-certificate` - Certificate verification
  - `POST /api/contact` - Contact form submissions
  - `POST /api/admission` - Admission inquiry submissions

**Data Storage**
- In-memory storage implementation (MemStorage class) for development/demo
- Interface-based storage abstraction (IStorage) allowing future database integration
- Pre-seeded sample data for certificates (ADCA/DCA courses)
- Drizzle ORM configured for PostgreSQL migration (schema defined but not yet connected)

**Data Models**
- Certificates: ID, certificate number, student name, course name (ADCA/DCA), issue date, grade
- Contact Forms: Name, email, phone, course interest, message
- Admission Inquiries: Similar structure for enrollment requests
- Chat Messages: ID, role (user/assistant), content, timestamp

### External Dependencies

**AI Integration**
- Google Gemini AI (via @google/genai package)
- Custom course advisor system prompt with detailed course information
- Conversation history tracking for contextual responses
- Configured to provide concise, helpful course recommendations

**Database (Configured but not active)**
- Neon Database serverless PostgreSQL (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries and migrations
- Schema defined in shared/schema.ts
- Migration configuration in drizzle.config.ts pointing to DATABASE_URL

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- React Icons (specifically SiWhatsapp for WhatsApp integration)
- CMDK for command palette functionality
- Embla Carousel for testimonial carousels

**Development Tools**
- Replit-specific plugins for runtime error overlay and development banners
- TypeScript with strict mode enabled
- Path aliases configured (@/ for client, @shared for shared code, @assets for images)

**Session Management**
- Connect-pg-simple for PostgreSQL session storage (configured but tied to future database)
- Express session middleware ready for authentication flows

### Design Patterns

**Monorepo Structure**
- Shared types and schemas in `/shared` directory
- Client code in `/client` directory with Vite build
- Server code in `/server` directory
- Asset management through `/attached_assets` with generated images

**Type Safety**
- Zod schemas serving dual purpose: runtime validation and TypeScript type inference
- Drizzle-zod integration for database schema validation
- Shared schema definitions prevent client-server type mismatches

**Separation of Concerns**
- Storage layer abstracted behind IStorage interface
- AI integration isolated in dedicated gemini.ts module
- Route handlers separated from business logic
- UI components follow atomic design principles

**Environment Configuration**
- Environment variables for sensitive data (GEMINI_API_KEY, DATABASE_URL)
- Different build configurations for development vs production
- Conditional Replit plugin loading based on NODE_ENV