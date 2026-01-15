# Next.js Documentation

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

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Automatically purges unused styles in production
- Responsive design with mobile-first approach

### clsx Utility
- Library for conditionally joining classNames
- Cleaner class name composition
- Example usage:
  ```typescript
  import clsx from 'clsx';
  
  function Button({ isActive }) {
    return (
      <button className={clsx(
        'px-4 py-2 rounded',
        isActive ? 'bg-blue-500' : 'bg-gray-300'
      )}>
        Click me
      </button>
    );
  }
  ```

### Font Optimization
- Uses `next/font` module
- Self-hosts font files at build time
- Eliminates layout shift by preloading fonts
- Zero layout shift strategy

## Best Practices

1. **Data Fetching**
   - Use Server Components for data fetching when possible
   - Implement proper error boundaries
   - Consider using React Query for complex client-side data management

2. **Performance**
   - Use `next/image` for optimized images
   - Implement code splitting
   - Use dynamic imports for large components

3. **Routing**
   - Leverage file-system based routing
   - Use route groups for better organization
   - Implement proper loading and error states

4. **State Management**
   - Use React Context for global state
   - Consider Zustand or Jotai for complex state management
   - Keep state as local as possible

## Common Patterns

### Layout Pattern
- Use `layout.tsx` for shared UI across routes
- Automatically persists state between page navigations
- Can be nested for complex UIs

### Loading Pattern
- Create `loading.tsx` files for automatic loading states
- Use skeleton loaders for better UX
- Implement error boundaries for graceful error handling

## Troubleshooting

### Common Issues
1. **Font Loading**
   - Ensure font files are properly imported
   - Check for casing issues in import paths

2. **Environment Variables**
   - Prefix with `NEXT_PUBLIC_` for client-side access
   - Add to `.env.local` for local development

3. **API Routes**
   - Place in `app/api` directory
   - Use Route Handlers for API endpoints
