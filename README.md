# CNC Electrical website (Frontend)

This is the frontend code for a business website built for a local electrical company. It is a statically generated site built with **Astro**, **React**, **TypeScript**, and **Tailwind CSS v4**, designed with smooth styling, responsive layout, and functional form handling.

The site includes two routes: `/` (home page) and `/careers`. The home page is structured as a single scrolling page with hash-based section navigation (e.g., `/#services`, `/#contact`). Interactive components such as the job application form are built as React islands using Astro's partial hydration.

Form submissions (contact and job applications) are sent to the company's email using a separate **Node.js + Express** backend that integrates with the **Twilio SendGrid API**.  
-> You can view the backend code here: [github.com/Ramen96/Electric-Server](https://github.com/Ramen96/Electric-Server)

---

## Tech Stack

- **TypeScript**
- **Astro** – static site generation and routing (`/`, `/careers`)
- **React** – interactive UI components (hydrated as Astro islands)
- **Tailwind CSS v4** – utility-first styling via `@tailwindcss/vite`
- **SendGrid (Twilio)** – for email delivery (via external backend)

---

## Features

- Two routes: `/` and `/careers`
- Home page supports smooth scrolling via URL hashes (e.g., `/#section`)
- Responsive design across devices
- Contact and job application forms
- Forms submit data to external email backend using SendGrid API
- HTTPS enabled via Certbot and Let's Encrypt
- Custom 404 page

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Ramen96/Electric.git
cd Electric
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root for development:

```
PUBLIC_API_URL=http://your-server-ip
```

For production, create a `.env.production` file. Leave the value empty to use relative URLs proxied through Nginx:

```
PUBLIC_API_URL=
```
