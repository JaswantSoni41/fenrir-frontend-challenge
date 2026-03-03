# Fenrir Security - Frontend Design Challenge

This is my implementation of the technical screening task for the Frontend Engineer role at Fenrir Security. The project is a high-fidelity B2B SaaS security dashboard, built to handle live scan data monitoring and reporting.

## Overview

The application recreates three key screens from the security platform, maintaining a premium and cohesive design across both **Dark** and **Light** modes.

### Included Screens

1. **Login/Signup (Split Layout)**: A modern entry page with feature highlights and social login integrations.
2. **Main Dashboard**: High-level security stats and a comprehensive, searchable list of security scans.
3. **Active Scan Detail**: A live-action console showing real-time spidering and vulnerability findings.

## **Deployment & Walkthrough**

- **Live Demo**: [https://fenrir-frontend-challenge.netlify.app/](https://fenrir-frontend-challenge.netlify.app/)
- **Video Walkthrough**: [Watch on Loom](https://www.loom.com/share/c02f295bd3ac439a9af665ba3323ab1c)

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State & Logic**: Functional Components, Hooks (useState, useEffect), and Zod for validation.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide/Tabler (via React Icons)

## Why pnpm?

I chose **pnpm** as the package manager for this project for several practical reasons:

- **Efficiency**: It uses a content-addressable store to save disk space and avoids redundant installations across projects.
- **Speed**: Installation is significantly faster than npm/yarn due to its unique symlinking approach.
- **Strictness**: It prevents "phantom dependencies," ensuring that the code only accesses what is explicitly defined in `package.json`, which leads to a more stable build environment.

## Requirements Checklist

- [X] **Visual Accuracy**: Pixel-perfect translation of the design reference for both themes.
- [X] **Navigation**: Logical flow from Login → Dashboard → Scan Details.
- [X] **Responsive**: Fully optimized for mobile (375px+) and desktop (1280px+).
- [X] **Theme Toggle**: Real-time theme switching that persists globally.
- [X] **Interactivity**: Functional search, tabs, and action-driven buttons (toasts/notifications).
- [X] **Mock Data**: Realistic JSON-based datasets for scans and findings.

## Bonus Features

- **Skeleton Loaders**: Custom loading states for every view to eliminate layout shifts.
- **Page Transitions**: Smooth slide-and-fade animations between routes.
- **Reusable Component Library**: Modular UI system for badges, buttons, and status chips.
- **Autofill Fixes**: Custom CSS to prevent browser autofill from breaking the form aesthetics.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/JaswantSoni41/fenrir-frontend-challenge.git
   cd fenrir-frontend-challenge
   ```
2. **Install dependencies**:
   Using **pnpm** (recommended):

   ```bash
   pnpm install
   ```

   Using **npm**:

   ```bash
   npm install
   ```
3. **Run development mode**:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```
4. **Build for production**:

   ```bash
   pnpm build
   # or
   npm run build
   ```

## Known Limitations / Notes

- **Mock Only**: All scanning actions (Start/Stop/Export) are simulated with UI feedback and didn't connect to a real backend as per the task requirements.
- **Auth Simulation**: Authentication is handled via `localStorage` to demonstrate session-based redirects and gated access without requiring a database.

---

Submitted by **Jaswant Soni** as part of the Fenrir Security technical evaluation.
