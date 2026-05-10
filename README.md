<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:8A2BE2,100:00FFFF&height=250&section=header&text=HyperionZS%20Portfolio&fontSize=50&fontAlignY=35&animation=twinkling&fontColor=ffffff" alt="Header Banner" />

  <h1 align="center">✨ Next-Gen Interactive Developer Portfolio ✨</h1>

  <p align="center">
    A highly dynamic, 3D-integrated personal portfolio website built with React, Three.js, and Firebase.
    <br />
    <a href="https://hyperionzs.github.io/portfolio-website/"><strong>Explore the Live Site »</strong></a>
    <br />
    <br />
  </p>
</div>

---

## 🌌 Overview

This project is not just a static resume; it is an **interactive digital experience**. Designed with a focus on modern web aesthetics (Cyberpunk/Neon accents, Glassmorphism, and Dark Mode), it leverages the power of WebGL via **Three.js** to create immersive backgrounds and elements, while maintaining high performance and accessibility.

Beyond the public-facing UI, this application features a **Secure Admin Dashboard** powered by Firebase Authentication and Firestore, allowing for seamless, real-time updates to the project showcase without ever needing to touch the source code.

## 🚀 Key Features

*   **Immersive 3D Graphics**: Utilizes `@react-three/fiber` and `vanta.js` for stunning, interactive background effects.
*   **Dynamic Content Management (CMS)**: Projects are fetched in real-time from **Firebase Firestore**.
*   **Admin Authentication**: Protected route (`/UploadProject`) utilizing Firebase Auth (Email/Password & Custom Roles) and cookie-based session management for secure content creation.
*   **Fluid Animations**: Smooth page transitions and micro-interactions powered by `framer-motion`.
*   **Modern Styling**: Fully responsive, utility-first design using **Tailwind CSS v4** with custom RGB neon dividers.
*   **Analytics Tracking**: Integrated Google Analytics 4 (GA4) for comprehensive traffic and event monitoring.

## 🛠️ Technology Stack

### Frontend & UI
*   **React 19** & **Vite**: Ultra-fast development server and modern component architecture.
*   **Tailwind CSS 4**: For rapid, highly-customizable styling.
*   **Framer Motion**: Production-ready animation library.
*   **Lucide React** & **React Icons**: Consistent and scalable iconography.

### 3D & Graphics
*   **Three.js**: The core WebGL engine.
*   **React Three Fiber (R3F)** & **Drei**: React renderers and helpers for Three.js.
*   **React Three Rapier**: 3D physics engine integration.
*   **Vanta.js**: Animated, interactive website backgrounds.

### Backend Services (BaaS)
*   **Firebase Authentication**: Secure user login and role management.
*   **Firebase Firestore**: NoSQL cloud database for storing project metadata.
*   **Firebase Functions**: Serverless environment for CORS configuration and admin tasks.

---

## ⚙️ Local Development Setup

To get a local copy up and running, follow these simple steps.

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   npm or yarn

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Hyperionzs/portfolio-website.git
cd portfolio-website
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure your Firebase and Google Analytics credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GA_MEASUREMENT_ID=your_ga4_measurement_id
VITE_GA_VIEW_ID=your_ga_view_id
```

### 4. Run Development Server
Start the Vite dev server:

```bash
npm run dev
```
Navigate to `http://localhost:5173` to view the application.

---

## 🔐 Admin Authentication Flow

The portfolio includes a hidden admin panel for adding new projects to the portfolio dynamically. 

1.  Navigate to the `/login` route.
2.  Authenticate using the designated Admin credentials (validated via Firebase Auth).
3.  Upon successful login, the app issues a secure session token and redirects to the `/UploadProject` dashboard.
4.  From the dashboard, the Admin can create, edit, or delete projects directly within the Firestore database.

*(Note: Public read access is enabled for the `projects` collection, but write access is strictly limited via Firestore Security Rules).*

---

## 📦 Deployment

This project is configured for automated deployment to **GitHub Pages** using the `gh-pages` package.

To deploy a new build:
```bash
npm run deploy
```
This script will bundle the application into the `dist` folder and push it to the `gh-pages` branch.

---

## 📬 Contact & Connect

**Anggra / HyperionZS**
*   📧 **Email:** [anggratr56@email.com](mailto:anggratr56@email.com)
*   📱 **WhatsApp:** [083155811515](https://wa.me/6283155811515)
*   🌐 **Live Portfolio:** [HyperionZS Portfolio](https://hyperionzs.github.io/portfolio-website/)

---
<div align="center">
  <sub>Built with ❤️ and modern web tech.</sub>
</div>
