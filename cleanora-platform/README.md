# Cleanora - 3D Cleaning Service Booking Platform

Cleanora is a premium MERN cleaning service management platform. This foundation prepares a separated React frontend and Node/Express backend for a future booking system, protected admin dashboard, dynamic services, gallery, reviews, WhatsApp contact flow, and a high-quality 3D animated hero section.

This step includes the initial full-stack foundation and the dynamic service menu module. Booking, admin dashboard, and 3D functionality will be added later.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Tooling: dotenv, CORS, Nodemon

## Folder Structure

```text
cleanora-platform/
  frontend/
    public/
    src/
      api/
      components/
      layouts/
      pages/
      App.jsx
      main.jsx
      index.css
    .env.example
    package.json
    tailwind.config.js
    postcss.config.js
    vite.config.js
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seeders/
      utils/
      app.js
      server.js
    .env.example
    package.json
  README.md
```

## Frontend Setup

```bash
cd cleanora-platform/frontend
npm install
npm run dev
```

The frontend will run on the Vite development URL shown in your terminal, usually:

```text
http://localhost:5173
```

## Backend Setup

```bash
cd cleanora-platform/backend
npm install
npm run dev
```

The backend defaults to:

```text
http://localhost:5000
```

Health check endpoint:

```http
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Cleanora API is healthy"
}
```

## Service API

```http
GET /api/services
GET /api/services/:id
POST /api/services
```

`GET /api/services` returns active services from MongoDB:

```json
{
  "success": true,
  "count": 8,
  "data": []
}
```

Seed the default cleaning service menu:

```bash
cd cleanora-platform/backend
npm run seed:services
```

## Environment Variables

Create a `.env` file in each app by copying the examples.

Backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Current Development Status

- Project structure created
- React + Vite frontend scaffolded
- Tailwind CSS configured
- Responsive landing page skeleton added
- Dynamic service cards loaded from MongoDB
- React Router page placeholders added
- API utility prepared for backend requests
- Express backend scaffolded
- MongoDB connection config prepared
- Health check route added
- Service model, controller, routes, and seeder added
- Error handling middleware added

## Future Modules

- Online booking form
- Booking persistence and validation
- Protected admin authentication
- Admin booking dashboard
- Booking completion and deletion actions
- Gallery and review management
- Contact form and WhatsApp integration
- Google Map embed
- React Three Fiber 3D animated hero section
