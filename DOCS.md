# Next.js Dashboard Documentation

## Table of Contents
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Course Roadmap (Chapters)](#course-roadmap-chapters)
- [Route Blueprint (Step-by-Step)](#route-blueprint-step-by-step)
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

## Course Roadmap (Chapters)

Use this as the "table of contents" for how to build any new route (Customers, Reports, Settings, etc.) using the same patterns you used for Invoices.

### Introduction
- What you are building
- What the folder structure means (`app/`, `app/lib/`, `app/ui/`)

### Chapter 1: Getting Started
- Run the project (`pnpm dev`)
- Confirm environment variables exist (`POSTGRES_URL`, auth secrets)

### Chapter 2: CSS Styling
- Tailwind usage patterns
- Reusing existing UI components in `app/ui/`

### Chapter 3: Optimizing Fonts and Images
- `next/font` (see `app/ui/fonts`)
- `next/image` (used in `app/ui/customers/table.tsx`)

### Chapter 4: Creating Layouts and Pages
- Page entry points live in `app/**/page.tsx`
- Shared layout patterns live in `app/**/layout.tsx`

### Chapter 5: Navigating Between Pages
- Use `next/link` for navigation
- Keep URL state in `searchParams` for search/pagination

### Chapter 6: Setting Up Your Database
- Database connection via `postgres` in `app/lib/data.ts` and `app/lib/actions.ts`

### Chapter 7: Fetching Data
- Fetch in Server Components (pages + server components)
- Core queries in `app/lib/data.ts` (example: `fetchFilteredCustomers`, `fetchFilteredInvoices`)

### Chapter 8: Static and Dynamic Rendering
- Decide when a page should be dynamic (depends on request data like `searchParams`)

### Chapter 9: Streaming
- Wrap slow parts in `<Suspense fallback={...}>` to stream UI
- Add `loading.tsx` for route-level fallback

### Chapter 10: Adding Search and Pagination
- Put the query in the URL (e.g. `?query=...&page=...`)
- Re-fetch on navigation to keep UI in sync

### Chapter 11: Mutating Data
- Use Server Actions in `app/lib/actions.ts`
- Use `useFormState` / `useActionState` on the client
- Revalidate/redirect with `revalidatePath` + `redirect`

### Chapter 12: Handling Errors
- Add `error.tsx` per route segment
- Throw errors in data functions when you want the error boundary to catch them

### Chapter 13: Improving Accessibility
- Use labels, `aria-describedby`, and `aria-live` for form errors
- Ensure images have meaningful `alt` text

### Chapter 14: Adding Authentication
- Credentials auth lives in `auth.ts`
- Route protection is configured in `auth.config.ts` (authorized callback)

### Chapter 15: Adding Metadata
- Global metadata in `app/layout.tsx`
- Route/page metadata in each `page.tsx` via `export const metadata`

## Route Blueprint (Step-by-Step)

This is the repeatable recipe to build any new dashboard route.

### 1) Create the route shell
- Create or update `app/dashboard/<route>/page.tsx`
- Keep it as a Server Component by default

### 2) Decide what state lives in the URL
- **Search**: `searchParams.query`
- **Pagination**: `searchParams.page`
- Anything that changes what data you fetch should usually be reflected in the URL

### 3) Add data functions in `app/lib/data.ts`
- Follow the existing patterns:
  - Invoices: `fetchFilteredInvoices(query, currentPage)` + `fetchInvoicesPages(query)`
  - Customers: `fetchFilteredCustomers(query)`

### 4) Build UI components in `app/ui/<route>/`
- Keep presentational components here
- Prefer server components for table rendering when possible

### 5) Add streaming/loading
- Use `<Suspense>` in the page to stream slow components
- Add `app/dashboard/<route>/loading.tsx` if you want a route-level loading UI

### 6) Add error handling
- Add `app/dashboard/<route>/error.tsx` for route-level errors
- Throw from data functions to trigger it

### 7) Add mutations (if needed)
- Add Server Actions in `app/lib/actions.ts`
- Revalidate + redirect on success
- Return validation errors as state for forms

### 8) Add accessibility
- `aria-live` for dynamic error output
- `aria-describedby` to connect inputs to error/help text

### 9) Add auth + metadata
- Confirm route is protected (anything under `/dashboard`)
- Add `export const metadata` for the page title

---

## Worked Example: Customers Page (Step-by-Step)

Goal: turn `app/dashboard/customers/page.tsx` (currently a placeholder) into a full customers page using your existing query + UI table.

### Step 1: Confirm the building blocks already exist
- **Data**: `app/lib/data.ts` already has `fetchFilteredCustomers(query)`.
- **UI**: `app/ui/customers/table.tsx` already renders the customers table and includes the shared `<Search />` component (`app/ui/search.tsx`).
- **Route**: `app/dashboard/customers/page.tsx` currently renders only `Customers Page`.

### Step 2: Implement `app/dashboard/customers/page.tsx`
- Make the page `async` so it can fetch data.
- Read URL state from `searchParams`:
  - `query`: default to `''`
- Fetch data:
  - `const customers = await fetchFilteredCustomers(query)`
- Render:
  - `<CustomersTable customers={customers} />`

### Step 3: Add streaming (recommended)
- Wrap the table in `<Suspense>`.
- Fallback:
  - If you don't have a customers-specific skeleton yet, either:
    - Reuse `InvoicesTableSkeleton` from `app/ui/skeletons.tsx`, or
    - Create a customers skeleton later.

### Step 4: Add route metadata
- In `app/dashboard/customers/page.tsx`:
  - `export const metadata = { title: 'Customers' }`

### Step 5: Add route error handling (recommended)
- Create `app/dashboard/customers/error.tsx`.
- Keep it simple:
  - Show a message
  - Provide a “Try again” button that calls `reset()`

### Step 6: Confirm search works end-to-end
- `app/ui/search.tsx` updates the URL:
  - sets `query`
  - resets `page` to `1`
- Because `page.tsx` reads `searchParams`, it will refetch customers automatically.

### Step 7: Confirm navigation entry exists
- Check `app/ui/dashboard/nav-links.tsx` has a link to `/dashboard/customers`.

### After Customers: reuse the same blueprint
- Replace the data function
- Replace the table component
- Keep the patterns (searchParams -> data.ts -> UI table -> Suspense/loading -> error.tsx -> metadata/auth)

## Authentication

### Setup
- Uses NextAuth.js with Credentials Provider
- Protected routes via `proxy.ts` matcher (NextAuth middleware)
- Session management with JWT

### Key Files
- `auth.config.ts`: Auth configuration
- `auth.ts`: Auth setup with NextAuth
- `proxy.ts`: Route protection matcher + `auth` middleware export
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
- Uses PostgreSQL via the `postgres` package
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
