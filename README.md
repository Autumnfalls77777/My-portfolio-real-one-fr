# Prabal Jaiswal — Design & Engineering Portfolio

Welcome to the personal portfolio web application of **Prabal Jaiswal** — Graphic Designer, Creative Developer, and Problem Solver.

This portfolio is built to showcase digital experiences at the intersection of aesthetic design and robust software engineering.

---

## 🚀 Tech Stack

### **Frontend**
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS, Custom Noise & Grid Overlays
- **Animations**: Framer Motion & Lucide Icons
- **State & Data**: TanStack React Query + Lanyard (Discord Live Status)

### **Backend & Database**
- **Server**: Node.js + Express + TypeScript
- **ORM**: Prisma ORM
- **Database**: SQLite (Local Dev) / PostgreSQL (Production)
- **Media Hosting**: Cloudinary API Integration
- **Security**: JWT Authentication, CSRF Protection, Rate Limiting, Helmet Security Headers

---

## ✨ Features

- **Interactive Hero Canvas**: Floating widgets (Spotify, Discord, GitHub, Steam, Current Project) with admin drag-and-drop position saving.
- **Graphic Design Studio**: Brand collections, artwork gallery, high-res previews, and detailed case studies.
- **Software Projects Showcase**: Featured engineering projects with live demos, tech stack tags, and GitHub repositories.
- **Career & Achievements**: Work experience timeline, offer letters, resume viewer, and recommendations.
- **Admin Control Panel**: Secure authentication system to update project entities, settings, and card layouts directly from the app.

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js `v18+`
- npm or yarn

### 2. Installation
```bash
# Install root (frontend) dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` in root and configure environment secrets:
```bash
cp .env.example .env
```

### 4. Running the App
```bash
# Start frontend dev server
npm run dev

# Start backend server (in backend directory)
cd backend
npm run dev
```

---

## 🌐 Production Deployment Guide

- **Frontend**: Deploy `dist/` to **Cloudflare Pages** (includes `public/_redirects` for SPA routing).
- **Backend & Database**: Deploy `backend/` to **Render** Web Service with **Render PostgreSQL** (uses `render.yaml` Blueprint).

---

## 👤 Author

**Prabal Jaiswal**
- **Portfolio**: [https://github.com/Autumnfalls77777](https://github.com/Autumnfalls77777)
- **Email**: `prabaljaiswal69420@gmail.com`
