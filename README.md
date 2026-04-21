# Anchor - AI Chief of Staff

Production-ready SaaS MVP using React (Vite), Tailwind, Node/Express, MongoDB, JWT auth, and OpenAI.

## Project Structure

```
.
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── styles
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server
│   ├── src
│   │   ├── config
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── index.js
│   └── package.json
├── .env.example
└── package.json
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` values (`MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, etc.).
4. Run dev servers:
   ```bash
   npm run dev
   ```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/triage`
- `POST /api/tasks`
- `GET /api/tasks`
- `PATCH /api/tasks/:id`
- `POST /api/debrief`

## Render Deployment Notes

- Create two Render services:
  - **Web Service (server)**
    - Root Directory: `server`
    - Build Command: `npm install`
    - Start Command: `npm start`
  - **Static Site (client)** or Web Service
    - Root Directory: `client`
    - Build Command: `npm install && npm run build`
    - Publish Directory: `dist`
- Set environment variables from `.env.example`.
- Set `VITE_API_URL` in client service to backend URL + `/api`.
