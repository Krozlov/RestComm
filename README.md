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

## 🎨 Design

- **Color palette** — Forest green, deep red, royal blue, and warm gold (inspired by our petal logo)
- **Dark mode** — Full light/dark toggle, persisted in localStorage, respects system preference
- **Typography** — Playfair Display (headings) + DM Sans (body)
- **WhatsApp-first** — Every listing card has a direct pre-filled WhatsApp link
- **Fully responsive** — Mobile, tablet, and desktop

---

## 🛠 Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + CSS custom properties
- **Icons** — [Lucide React](https://lucide.dev/)
- **Fonts** — Google Fonts (Playfair Display, DM Sans)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/restcomm.git
cd restcomm

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## ☁️ Deploying to Vercel (Free)

The fastest way to get RestComm live:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import this repo
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**

Your site will be live at a link like `restcomm.vercel.app` in about 60 seconds. Every future `git push` auto-redeploys.

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

## 🔮 Roadmap (Backend — Phase 2)

The frontend is complete. The following will be built in the next phase:

- [ ] User authentication (phone OTP or email)
- [ ] Database integration (listings, profiles, reviews)
- [ ] Image upload storage (Cloudinary or Supabase Storage)
- [ ] Admin dashboard for listing moderation
- [ ] Push notifications for new WhatsApp inquiries
- [ ] Search with location-based filtering
- [ ] Saved listings (favourites)

---

## 🤝 Contributing

RestComm is a community project. Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built with ❤️ for seniors everywhere. Because every life has something beautiful left to give.*
