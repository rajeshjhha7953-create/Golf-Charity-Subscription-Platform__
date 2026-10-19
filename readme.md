# ⛳ Golf Charity Platform

A full-stack web application that combines golf scoring, leaderboards, and charity initiatives to create a community-driven golfing experience. The platform allows users to track scores, compete with other players, explore charity activities, and engage with a golf community through an interactive dashboard.

## 🚀 Features

- **User Dashboard** — Centralized interface to access golf activities and platform features.
- **Golf Scoring** — Record and manage golf scores.
- **Leaderboard** — Compare player performance and rankings.
- **User Profiles** — Manage player information and personal details.
- **Charity Initiatives** — Explore and participate in charity-focused activities.
- **Subscription Management** — Access subscription-related features.
- **Admin Dashboard** — Administrative tools for managing platform activities.
- **Authentication** — Admin login and Supabase integration.
- **Responsive UI** — Styled using Tailwind CSS for a modern interface.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, JavaScript
- **Styling:** Tailwind CSS, CSS
- **Backend & Database:** Supabase
- **Database Schema:** PostgreSQL (via Supabase)
- **Development Tools:** Node.js, npm, Git

## 📁 Project Structure

```text
golf-platform/
├── lib/
│   └── supabase.js
├── pages/
│   ├── admin/
│   ├── api/
│   ├── _app.js
│   ├── admin-login.js
│   ├── admin.js
│   ├── charity.js
│   ├── dashboard.js
│   ├── draw.js
│   ├── index.js
│   ├── leaderboard.js
│   ├── profile.js
│   ├── scores.js
│   └── subscribe.js
├── styles/
│   └── globals.css
├── supabase/
│   └── schema.sql
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm installed
- A Supabase account and project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd golf-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add the required Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the exact variable names expected by your `lib/supabase.js` file. Never commit secret service-role keys or other private credentials.

### 4. Set up the database

1. Open your Supabase project.
2. Navigate to the SQL Editor.
3. Run the SQL commands from `supabase/schema.sql`.
4. Configure the necessary authentication and database access policies.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Security

- Keep environment variables and private credentials out of version control.
- Configure appropriate Supabase Row Level Security (RLS) policies.
- Restrict administrative functionality to authorized users.
- Validate user input and protect sensitive database operations.

## 🗺️ Future Enhancements

- Online charity donations and payment integration.
- Golf tournaments and event management.
- Real-time leaderboard updates.
- Advanced player statistics and performance analytics.
- Email notifications and charity campaign updates.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome. Fork the repository, create a feature branch, and submit a pull request.

## 📄 License

This project is available for educational and development purposes. Add a license file if you intend to distribute it publicly.
