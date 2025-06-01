# Work-Based Learning Management System

A secure, tiered platform for administering work-based learning programs with role-based access control.

## Features

- Granular role-based access control (Admin/Teacher/Student)
- Compliance-ready security architecture
- Integrated referral and progress tracking
- Montana-optimized performance

## Tech Stack

- Next.js 14.1.0 (App Router)
- Supabase (Auth, PostgreSQL, Storage)
- Tailwind CSS + DaisyUI
- TypeScript
- Lucide React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── (public)/
│   ├── login/
│   ├── signup/
│   ├── forgot-password/
│   └── verify-email/
├── (protected)/
│   ├── dashboard/
│   ├── profile/
│   ├── referrals/
│   └── admin/
└── api/
```

## Security Features

- Row Level Security (RLS)
- Role-Based Access Control (RBAC)
- 1-hour session timeout
- Email/Password + Google OAuth authentication

## Development

- Static rendering for public routes
- Edge functions for auth
- Image optimization
- TypeScript for type safety 