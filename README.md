# Because You Won't™ - Minecraft Service Application

A professional Minecraft service delivery platform built with React + TypeScript + Vite.

## 🚀 Live Demo

Visit the live application: [https://nilstgg.github.io/job-board-appp/](https://nilstgg.github.io/job-board-appp/)

## 📦 Features

- Professional service request system
- Real-time pricing calculator
- Enhanced user experience with animations
- Mobile-responsive design
- Trust building elements and testimonials
- Interactive FAQ with search functionality

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

- Push to `main` or `master` branch triggers automatic deployment
- The site is built and deployed to GitHub Pages automatically
- Visit the Actions tab to monitor deployment status

### Manual Deployment

```bash
# Build and deploy manually (if needed)
npm run build
npm run deploy
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── icons.ts            # Icon exports
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions
└── dist/                   # Production build (auto-generated)
```

## 🔧 Configuration

- **Base URL**: `/job-board-appp/` (configured for GitHub Pages)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Form Handling**: Formspree integration

## Discord webhook (Order notifications)

The marketplace order flow can send order details to a Discord webhook. Set the webhook URL in an env file (create `.env` from `.env.example`) using the Vite prefix:

```
VITE_DISCORD_WEBHOOK=https://discord.com/api/webhooks/your_webhook_id/your_webhook_token
```

Because this is done client-side, be aware that the webhook URL will be visible in the client bundle. For production security consider proxying through a server-side endpoint.

Alternative (recommended for static hosting): use Formspree to receive form submissions and forward them to Discord (or another integration). This keeps forwarding secrets out of the client bundle and works well with GitHub Pages.

To use Formspree:

1. Create a form in Formspree and get the form ID (the short id after /f/ in your form action URL).
2. Add it to your `.env` as `VITE_FORMSPREE_FORM_ID=your_form_id`.
3. Configure Formspree's integrations/webhooks to forward submissions to Discord or other services.

The app attempts Formspree first (if `VITE_FORMSPREE_FORM_ID` is set), then falls back to `VITE_DISCORD_WEBHOOK`.

## ✨ Enhanced Features

- Loading states and visual feedback
- Auto-save functionality
- Interactive service selector
- Enhanced pricing calculator
- Process visualization
- Trust building testimonials
- Searchable FAQ section

---

**Note**: This is a portfolio/demo project showcasing modern React development practices and professional UI/UX design.
