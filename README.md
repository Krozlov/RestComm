# 🌸 RestComm

> **A community marketplace where seniors share their skills, services, and stories with the world.**

*"Loneliness is not Emptiness. Emptiness is Loneliness."*

RestComm was built to solve a quiet crisis — seniors who have so much to offer, but no platform to offer it. We bridge that gap by giving every senior a simple, dignified space to post their services and connect directly with the community around them.

---

## ✨ What It Does

Seniors post a photo and a short description of what they're offering — pet sitting, homemade food, tutoring, crafts, home repairs, and more. Interested members of the public then **contact them directly via WhatsApp** to arrange everything. No complex systems, no middlemen — just real human connection.

---

## 📸 Pages

| Route | Description |
|---|---|
| `/` | Home — hero, category browser, featured listings, how it works, mission |
| `/marketplace` | Browse all listings with search, category filters, and sorting |
| `/listing/[id]` | Full listing detail with WhatsApp contact, reviews, related listings |
| `/profile/[id]` | Senior profile — bio, badges, listings, rating breakdown |
| `/post-listing` | 3-step wizard to create a new listing (photo → details → contact) |
| `/dashboard` | Member dashboard — stats, listing management, notifications, settings |
| `/login` | Login page with phone + password |
| `/signup` | Multi-step sign up (Personal info → Password → Done) |
| `/about` | Mission, values, and our story |

---

## 🚀 Prerequisites

- [Node.js 18+](https://nodejs.org/)
- npm (comes with Node.js)

---

## 📁 Project Structure

```
restcomm/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation with dark mode toggle
│   │   ├── Footer.tsx          # Site footer with links
│   │   └── ListingCard.tsx     # Reusable listing card component
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/light mode context
│   ├── data/
│   │   └── listings.ts         # Mock listings and categories data
│   ├── about/                  # About page
│   ├── dashboard/              # Member dashboard
│   ├── listing/[id]/           # Individual listing detail
│   ├── login/                  # Login page
│   ├── marketplace/            # Browse all listings
│   ├── post-listing/           # Create a listing (3-step wizard)
│   ├── profile/[id]/           # Senior profile page
│   ├── signup/                 # Sign up page
│   ├── globals.css             # Global styles & CSS variables
│   ├── layout.tsx              # Root layout with ThemeProvider
│   └── page.tsx                # Home page
├── public/                     # Static assets
├── package.json
└── README.md
```

---
*Built with ❤️ for seniors everywhere. Because every life has something beautiful left to give.*
