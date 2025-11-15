# Feedback Management Dashboard - Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `server` directory with the following variables:
```
MONGO_URI=mongodb+srv://Feedback:1234@cluster0.w8ce3ev.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

3. Run the server:
```bash
npm run server
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and get JWT token

### Feedback (`/api/feedback`)
- `POST /api/feedback` - Create new feedback (Protected)
- `GET /api/feedback` - Get all feedbacks (Protected)

### Statistics (`/api/stats`)
- `GET /api/stats` - Get feedback statistics (Protected)

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm run server`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (optional, Render will provide one)

