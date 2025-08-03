# 🖥️ Travel Article App – Frontend (Vite + React)

A modern frontend built with React, styled with Tailwind CSS and Shadcn UI, designed to interact with the Travel Article API.

---

## 🚀 Tech Stack

- Vite (React + TypeScript)
- Tailwind CSS + Shadcn UI
- React Router DOM – Routing
- React Query – Data fetching & caching
- Zustand – Lightweight global state
- Zod – Schema validation
- Framer Motion – Animations
- Axios – API calls

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/danielsmpe/travel-article-app-fe.git
cd travel-article-app-fe

# 2. Install dependencies
npm install

# 3. Create environment file (.env)
# Example:
VITE_API_URL=http://localhost:3000


# 4. Build the production-ready app
npm run build

# 5. Preview the built site (optional, for testing)
npm run preview

# --- OR ---

# (Dev Only) Start the development server
npm run dev

---
```

Pastikan backend berjalan di URL yang sama dengan VITE_API_URL.

## 📂 Project Structure

```

src/
├── components/
├── hooks/
├── lib/
├── pages/
├── schemas/
├── App.tsx
└── main.tsx

```

---

## 📚 Features

- 🔓 Public Access: Landing page & article preview for all users
- 🔐 Authentication-aware: Create, edit, and delete only if logged in
- ✍️ Comment System: Add, update, and delete comments on articles
- 📄 Form Validation: Robust validation using Zod
- 🪄 Beautiful UI: Styled with Tailwind + Shadcn, animated with Framer Motion
- 🧱 Skeleton Loading: Smooth UX during data fetching
- ⚙️ Modular & Clean Architecture: Easy to scale and maintain

---
