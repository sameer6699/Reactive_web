# Dashboard Components

This directory contains all the dashboard-related components for the Reactive Web Marketplace.

## Components

### Dashboard.tsx
Main dashboard component that serves as the entry point for the dashboard.

### DashboardLayout.tsx
Layout component that handles the overall dashboard structure including sidebar, header, and content area with routing.

### DashboardSidebar.tsx
Reactive sidebar component with:
- Collapsible functionality
- Navigation menu items
- Smooth animations using Framer Motion
- User logout functionality
- Active state management

### DashboardHeader.tsx
Header component with:
- Search functionality
- Notifications with badge
- User profile dropdown
- Sidebar toggle button
- Responsive design

### DashboardContent.tsx
Main dashboard content with:
- Welcome section
- Statistics cards
- Recent activity feed
- Responsive grid layout
- Smooth animations

## Features

### Authentication
- Protected routes using `ProtectedRoute` component
- Automatic redirect to login if not authenticated
- Redirect back to intended page after login

### Responsive Design
- Mobile-friendly layout
- Collapsible sidebar for smaller screens
- Responsive grid layouts

### Animations
- Smooth transitions using Framer Motion
- Hover effects on interactive elements
- Loading states with animations

### Navigation
- Nested routing within dashboard
- Active state management
- Breadcrumb-style navigation

## Usage

1. User logs in through `/login`
2. Upon successful authentication, user is redirected to `/dashboard`
3. Dashboard shows overview with statistics and recent activity
4. Sidebar navigation allows access to different sections
5. Header provides search and user management options

## Routes

- `/dashboard` - Main dashboard overview
- `/dashboard/templates` - User's templates
- `/dashboard/orders` - Order management
- `/dashboard/analytics` - Analytics and reports
- `/dashboard/notifications` - Notification center
- `/dashboard/profile` - User profile
- `/dashboard/settings` - Account settings

## Styling

All components use Tailwind CSS with:
- Dark mode support
- Consistent color scheme
- Modern design patterns
- Accessibility considerations 