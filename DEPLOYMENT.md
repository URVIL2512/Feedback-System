# Vercel Deployment Guide

This guide will help you deploy the Feedback Management System to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account with your database connection string
3. GitHub repository (already set up)

## Step-by-Step Deployment

### 1. Connect Your GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `URVIL2512/Feedback-System`
4. Vercel will automatically detect the project structure

### 2. Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Other (or Vite if available)
- **Root Directory**: `./` (root of the project)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`

### 3. Set Environment Variables

In Vercel project settings, add these environment variables:

#### Backend Environment Variables:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

#### Frontend Environment Variables:
```
VITE_API_URL=/api
```

**Important Notes:**
- Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string
- Replace `your_jwt_secret_key_here` with a strong random string (you can generate one)
- Replace `your-vercel-app.vercel.app` with your actual Vercel deployment URL (you'll get this after first deployment)

### 4. Deploy

1. Click "Deploy" button
2. Wait for the build to complete
3. Your app will be live at `https://your-project-name.vercel.app`

### 5. Update CORS Origin (After First Deployment)

After the first deployment, you'll get your Vercel URL. Update the `CORS_ORIGIN` environment variable in Vercel:

1. Go to Project Settings → Environment Variables
2. Update `CORS_ORIGIN` to your actual Vercel URL
3. Redeploy the project

## Project Structure for Vercel

```
Feedback-System/
├── frontend/          # React frontend
│   ├── src/
│   ├── dist/         # Build output (generated)
│   └── package.json
├── server/           # Express backend
│   ├── server.js     # Main server file (exported for Vercel)
│   └── ...
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

## How It Works

- **Frontend**: Built as a static site and served from Vercel's CDN
- **Backend**: Converted to serverless functions that handle API routes
- **API Routes**: All `/api/*` requests are routed to the Express server
- **Static Files**: All other requests serve the React app

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify build command is correct
- Check Vercel build logs for specific errors

### API Not Working
- Verify environment variables are set correctly
- Check MongoDB Atlas network access allows Vercel IPs (or use 0.0.0.0/0 for all)
- Ensure CORS_ORIGIN matches your Vercel URL

### Database Connection Issues
- Verify MONGO_URI is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel IPs
- Ensure database user has proper permissions

## Post-Deployment

After successful deployment:

1. Test all features:
   - User signup/login
   - Feedback submission
   - Statistics display
   - Filtering by rating
   - CSV export

2. Update your GitHub repository with any changes

3. Future deployments are automatic when you push to GitHub!

## Custom Domain (Optional)

You can add a custom domain in Vercel project settings:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

