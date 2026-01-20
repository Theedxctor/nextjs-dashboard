# Next.js Dashboard Documentation

## Table of Contents
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Authentication](#authentication)
- [Routing](#routing)
- [Metadata](#metadata)
- [Form Handling](#form-handling)
- [Database](#database)
- [UI Components](#ui-components)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Best Practices](#best-practices)

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- Package Manager: pnpm (recommended) or npm

### Creating a New Project
```bash
# Install pnpm (if not installed)
npm install -g pnpm

# Create a new Next.js app
npx create-next-app@latest your-app-name
# Follow the prompts and choose Tailwind CSS when asked

# Navigate to project directory
cd your-app-name

# Install dependencies
pnpm i

# Start development server
pnpm dev
```

## Project Structure

```
/
├── app/                    # App Router directory
│   ├── dashboard/         # Dashboard routes
│   ├── lib/               # Utility functions and data fetching
│   └── ui/                # UI components
├── public/                # Static assets
└── package.json           # Project dependencies
```

## Key Concepts

### Server Components
- Run on the server, reducing client-side JavaScript
- Support async/await natively
- Can query database directly without additional API layer
- Improve performance by keeping data fetching and logic on the server

### Data Fetching Patterns

#### Waterfall Pattern
- Sequential network requests where each depends on the previous one's completion
- Can be optimized using parallel data fetching

#### Parallel Data Fetching
- Start multiple data fetches simultaneously
- Implemented using native JavaScript Promise patterns
- Improves load times but can be affected by the slowest request

### Rendering Strategies

#### Static Rendering (Default)
- Data fetching and rendering happens at build time or during revalidation
- **Benefits**:
  - Faster page loads
  - Reduced server load
  - Better SEO

#### Dynamic Rendering
- Content is rendered on the server for each request
- **Use cases**:
  - Real-time data
  - User-specific content
  - Request-time information

### Performance Optimization

#### Streaming
- Breaks down routes into smaller chunks
- Progressively streams content as it becomes ready
- Prevents slow data requests from blocking the entire page

#### Loading States
- Implemented using `loading.tsx` (built on React Suspense)
- Shows fallback UI while content loads
- Enables interruptable navigation

### Component Organization

#### Route Groups
- Organize files into logical groups without affecting URL structure
- Created using parentheses: `(groupname)`
- Example: `/dashboard/(overview)/page.tsx` becomes `/dashboard`

#### Suspense Boundaries
- Defer rendering until conditions are met (e.g., data is loaded)
- Can be used at page or component level
- Helps create better loading experiences

## Authentication

### Setup
- Uses NextAuth.js with Credentials Provider
- Protected routes via middleware
- Session management with JWT

### Key Files
- `auth.config.ts`: Auth configuration
- `auth.ts`: Auth setup with NextAuth
- `middleware.ts`: Route protection
- `app/login/page.tsx`: Login page
- `app/ui/login-form.tsx`: Login form component

### Protected Routes
- All routes under `/dashboard` require authentication
- Unauthenticated users are redirected to `/login`
- After login, users are redirected to `/dashboard` or their intended destination

## Routing

### App Router Structure
```
app/
  dashboard/
    (overview)/
    customers/
    invoices/
  login/
  api/
```

### Dynamic Routes
- Invoice details: `/dashboard/invoices/[id]`
- Customer details: `/dashboard/customers/[id]`

## Metadata

### Configuration
- Global metadata in `app/layout.tsx`
- Page-specific metadata in route segments
- Dynamic title templates

### Example
```typescript
// app/dashboard/invoices/page.tsx
export const metadata: Metadata = {
  title: 'Invoices',  // Renders as "Invoices | Acme Dashboard"
};
```

## Form Handling

### Form Validation
- Server-side validation with Zod
- Client-side feedback with React Hook Form
- Error handling with custom hooks

### Example Form
```typescript
// In a server action
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // ...
}
```

## Database

### Schema
- Uses PostgreSQL with Prisma
- Main tables: `invoices`, `customers`, `users`
- Relations between tables for data integrity

### Querying
- Server Components for data fetching
- Data revalidation with `revalidatePath`
- Optimistic UI updates

## UI Components

### Design System
- Tailwind CSS for styling
- Heroicons for icons
- Responsive layout
- Dark mode support

### Key Components
- `SideNav`: Navigation sidebar
- `TopNav`: Top navigation bar
- `Button`: Reusable button component
- `Form`: Form components with validation

## Environment Variables

### Required
```
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

### Development
- Enable debug logging
- Use local database
- Disable production optimizations

## Development

### Scripts
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

### Requirements
- Node.js 18+
- PostgreSQL database
- Environment variables set

### Platforms
- Vercel (recommended)
- Netlify
- Self-hosted

## Best Practices

### Security
- Use environment variables for secrets
- Implement proper error boundaries
- Validate all user input
- Use HTTPS in production

### Performance
- Implement code splitting
- Use React Server Components
- Optimize images
- Implement caching where appropriate
