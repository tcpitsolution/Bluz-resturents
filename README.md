# Bluez Restaurant — Premium Website Demo

A responsive React + Vite website concept prepared for a client presentation by **TCP IT Solution**.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Vite prints a local development URL (usually `http://localhost:5173`). To create a production build:

```bash
npm run build
npm run preview
```

## What's included

- Responsive homepage and shared sticky navigation/footer
- Routes: `/`, `/menu`, `/reserve`, `/experiences`, `/celebrations`, `/gallery`, `/locations`, `/locations/cg-road`, `/locations/ranchhodra`, `/faq`, `/contact`, `/privacy-policy`, `/terms`, plus a branded 404 page
- Searchable and filterable illustrative menu with item detail modal
- Reservation and event enquiry demo forms with validation, reference code, and honest non-confirmation messaging
- Gallery filters and keyboard-accessible buttons for a lightbox with previous/next controls
- Rule-based Bluez Concierge demo assistant
- WhatsApp enquiry links and floating contact shortcut
- Centralized editable business data in `src/data/restaurantConfig.js`
- Reduced-motion support, semantic controls, page titles, responsive layout, and a TCP IT Solution footer credit

## Important before production

This is a **demo**, not a live booking system. Forms only create an on-screen demo state and do not notify Bluez or store data on a server. The Concierge is rule-based and is not connected to a live AI service.

Please verify with the restaurant owner before launch:

1. Correct phone/WhatsApp number and official booking link.
2. Exact Ranchhodra outlet address, map pin, outlet-specific contact details and opening hours.
3. Current official menu, dish names, dietary/allergen information and prices.
4. Google Business Profile / reviews URL and the supplied 4.1 rating / 2,429 review count.
5. Official restaurant photography/video and rights to publish each asset.
6. Official social profiles and business email.
7. Actual celebration packages, decoration availability, event policies and rates.
8. Privacy policy, terms, consent wording, cancellation policy, data retention and any required legal review.
9. A secure backend/API for reservations and enquiries, server-side validation, anti-spam protection, and a real notification workflow.
10. Production domain/canonical URL, sitemap/robots configuration, analytics consent if needed, and verified Restaurant/LocalBusiness structured data.

The menu is labelled illustrative. The CG Road-side address, rating/review count and phone number are displayed as supplied details, not independently verified. The Ranchhodra address remains a placeholder. Photos are generic illustrative hospitality images and should be replaced by approved Bluez media before public launch.
