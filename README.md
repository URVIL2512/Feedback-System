# Feedback Management Dashboard

A complete full-stack application for managing customer feedback with authentication, statistics, and a modern UI.

## Project Structure

```
Feedback System/
├── server/                 (Backend - Node.js/Express/MongoDB)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── frontend/              (Frontend - React/Vite/Tailwind)
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── api/
    └── index.html
```

## Quick Start

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=mongodb+srv://Feedback:1234@cluster0.w8ce3ev.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

4. Start the server:
```bash
npm run server
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

### Authentication
- User signup and login
- JWT token-based authentication
- Protected routes

### Dashboard
- Real-time statistics (Total, Average Rating, Positive/Negative counts)
- Submit new feedback with rating system
- View all feedbacks in a table
- Responsive design

### API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login and get token

**Feedback:**
- `POST /api/feedback` - Create feedback (Protected)
- `GET /api/feedback` - Get all feedbacks (Protected)

**Statistics:**
- `GET /api/stats` - Get dashboard statistics (Protected)

## Deployment

### Backend (Render)
1. Connect GitHub repository
2. Build command: `npm install`
3. Start command: `npm run server`
4. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` (your backend URL)

## Technologies Used

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt

**Frontend:**
- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React Icons

  ## Promt
  https://drive.google.com/file/d/1jKXeccg2rSxYwViFfCUivQ2G8ZrOJZdA/view?usp=sharing

 ## Drive link for the demo video 
https://drive.google.com/file/d/1f1T1N9EPtp3jyIoCRnkovGhGxctJwF93/view?usp=sharing

 ## Deployment Link
https://feedback-system-brown.vercel.app/

