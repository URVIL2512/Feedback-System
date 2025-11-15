# Feedback Management Dashboard - Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000/api
```

For production, update this to your backend URL:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

4. Build for production:
```bash
npm run build
```

## Features

- **Authentication**: Login and Signup pages with JWT token management
- **Dashboard**: Overview with statistics cards and feedback management
- **Feedback Form**: Submit new feedback with rating system
- **Feedback Table**: View all feedbacks with sorting and filtering
- **Protected Routes**: Automatic redirect to login if not authenticated
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Deployment

### Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

