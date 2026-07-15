# Style Dial — Style Configurator Frontend

Style Dial is a full-stack clothing configurator that lets customers pick a garment, customize its colors and part options in real time on an SVG mock-up, see live pricing, manage a cart of multiple configured items, and generate a PDF receipt/summary of their order.

This repository contains the **frontend**, built with React, TypeScript, and Vite. It talks to a companion backend API for model/pricing data and to [The Color API](https://www.thecolorapi.com) for color naming.

Live demo: https://styledial.vercel.app

## Features

- **Product selection** — browse available garment models with previews, arrows/swipe navigation, and a "see all" modal grid.
- **Live configurator** — choose per-part options (e.g. fabric, style variants) and colors via an interactive color picker; changes are re-rendered onto the model's SVG artwork on the fly.
- **Dynamic pricing** — price is recalculated from the backend as the configuration (SKU/config key) changes, with a detailed price breakdown view.
- **Cart** — add multiple configured items (with size and quantity) to a cart, edit or remove items, persisted across sessions.
- **PDF export** — generate a downloadable PDF summary of the cart/order using `@react-pdf/renderer`, including rendered snapshots of each configured item.
- **Responsive layouts** — distinct desktop and mobile experiences (separate mobile components for options, configuration, cart, and price breakdown), plus portrait/landscape guidance on small screens.
- **Animated transitions** — page and element transitions powered by Framer Motion.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server & build tooling
- [Redux Toolkit](https://redux-toolkit.js.org/) + [redux-persist](https://github.com/rt2zz/redux-persist) — state management (models, configuration, cart, UI state)
- [React Router](https://reactrouter.com/) — client-side routing
- [styled-components](https://styled-components.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [react-colorful](https://github.com/omgovich/react-colorful) — color picker
- [@react-pdf/renderer](https://react-pdf.org/) / [react-pdf](https://github.com/wojtekmaj/react-pdf) — PDF generation and preview
- [Axios](https://axios-http.com/) — HTTP client

## Project Structure

```
src/
├── Api/                # Axios wrappers for the backend and color-name APIs
├── animations/         # Framer Motion animation presets (fade, slide)
├── components/
│   ├── style/           # Shared styled-components (buttons, common layout)
│   └── ui/               # Reusable UI (navbar, footer, modals, spinners, dialogs)
├── constants/           # Static lookup data (e.g. part/back relations)
├── helpers/             # SKU/config-key parsing, model helpers, PDF & image helpers
├── hooks/               # Custom hooks (e.g. responsive breakpoints)
├── models/              # TypeScript interfaces (Model, Cart, Price)
├── pages/
│   ├── Configurator/     # Configurator sub-views (model preview, options, price breakdown, color picker)
│   ├── Final/             # Cart, price breakdown, PDF generation/download
│   └── Selection/         # Product list & image browsing
├── store/               # Redux store, slices (models, configuration, cart, webSite), hooks
├── App.tsx              # App shell: navbar + routed pages
├── AnimatedRoutes.tsx   # Route definitions with animated page transitions
└── main.tsx             # Entry point
```

## Application Flow

1. **Landing** (`/`) — intro/marketing page.
2. **Selection** (`/products`) — pick a garment model to configure.
3. **Compose** (`/compose`) — configure colors and part options for the selected model, view live price, and add the item to the cart.
4. **Final** (`/final`) — review the cart, see the full price breakdown, and download a PDF summary.

## Getting Started

### Prerequisites

- Node.js (recent LTS)
- A running instance of the [companion backend](https://github.com/aleksbn/style-configurator-backend) (or access to the hosted one)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.development` (or `.env.local`) file with:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_COLOR_API_URL=https://www.thecolorapi.com
```

- `VITE_BACKEND_URL` — base URL of the style-configurator backend (models, pricing, PDF, configurations endpoints).
- `VITE_COLOR_API_URL` — base URL of The Color API, used to resolve hex codes to color names.

### Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint over the project |
| `npm run preview` | Preview the production build locally |

## License

MIT © Aleksandar Matic
