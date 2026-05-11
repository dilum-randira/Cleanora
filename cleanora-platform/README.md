# Cleanora - 3D Cleaning Service Booking Platform

Cleanora is a premium MERN cleaning service management platform. This foundation prepares a separated React frontend and Node/Express backend for a future booking system, protected admin dashboard, dynamic services, gallery, reviews, WhatsApp contact flow, and a high-quality 3D animated hero section.

This step includes the initial full-stack foundation, dynamic service menu module, online booking form, and protected admin dashboard. 3D functionality will be added later.

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

## Booking API

```http
POST /api/bookings
GET /api/bookings           Authorization: Bearer TOKEN
GET /api/bookings/:id       Authorization: Bearer TOKEN
PATCH /api/bookings/:id/complete  Authorization: Bearer TOKEN
DELETE /api/bookings/:id    Authorization: Bearer TOKEN
```

Example booking request:

```json
{
  "customerName": "Jane Perera",
  "email": "jane@example.com",
  "phone": "+94 77 123 4567",
  "service": "SERVICE_OBJECT_ID",
  "date": "2026-05-20",
  "time": "10:30",
  "address": "12 Park Road, Colombo",
  "notes": "Please call on arrival"
}
```

## Admin API

```http
POST /api/admin/login
```

Default assignment credentials:

```json
{
  "email": "admin@cleanora.com",
  "password": "admin123"
}
```

Protected admin booking routes require:

```http
Authorization: Bearer YOUR_TOKEN
```

## Environment Variables

Create a `.env` file in each app by copying the examples.

Backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@cleanora.com
ADMIN_PASSWORD=admin123
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
- Online booking form saves customer bookings to MongoDB
- Protected admin login and booking dashboard added
- React Router page placeholders added
- API utility prepared for backend requests
- Express backend scaffolded
- MongoDB connection config prepared
- Health check route added
- Service model, controller, routes, and seeder added
- Booking model, controller, and test routes added
- JWT admin authentication middleware added
- Admin booking completion and deletion actions added
- Error handling middleware added

## Future Modules

- Gallery and review management
- Contact form and WhatsApp integration
- Google Map embed
- React Three Fiber 3D animated hero section
