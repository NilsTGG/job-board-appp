# Changelog

## [1.1.0] - 2025-12-16

### Added

- Tabbed navigation (QuickNavTabs) to reduce page scroll
- Partner Shops section with clickable shop cards
- "Partner Shops" button in hero section
- Back navigation button in marketplace header
- Delivery fee notice displayed in cart before checkout
- Discord link for leaving reviews
- Real-time coordinate validation with visual feedback
- Skip link and improved keyboard navigation
- Focus rings on all interactive elements

### Changed

- Header simplified: "Marketplace" renamed to "Shops"
- Improved color contrast (gray-400 → gray-300)
- Increased font sizes for better readability
- Enhanced form inputs with larger padding
- Cart remove button made more visible (red + larger icon)
- Product cards use semantic `<article>` elements
- Reviews "Leave a Review" now links to Discord

### Fixed

- Delivery fee now flat 4💎 (previously distance-based)
- Coordinate Y-axis validation with Minecraft limits (-64 to 320)
- Auto-format coordinates on blur

### Removed

- 7/11 from service selector (moved to Partner Shops)
- Footer disclaimer text
- Distance-based delivery fee calculation

---

## [1.0.0] - Initial Release

### Features

- Service request form with Formspree integration
- Marketplace with product grid and cart
- Shop filtering by category and shop
- Checkout modal with coordinate input
- Reviews carousel with real testimonials
- Mobile-responsive design
