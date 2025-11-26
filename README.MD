# Thumby-Pie

## Description

Thumby-Pie is a full-stack web application for generating, managing, and sharing AI-generated images. It features user authentication, session management, and a modern frontend for seamless user experience.

## Key Features

- AI-powered image generation
- User authentication and session management
- Image history and session tracking
- RESTful API backend
- Modern React frontend
- Cloudinary integration for image storage

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript, Mongoose
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Other:** bcryptjs, multer, dotenv, resend(for Email send), [AbstractAi](https://www.abstractapi.com/)

## Project Structure

```
BackEnd/
  ├── src/
  │   ├── controllers/         # API controllers
  │   ├── db/                  # Database connection
  │   ├── emails/              # Email templates
  │   ├── helpers/             # Helper functions
  │   ├── middleware/          # Express middlewares
  │   ├── models/              # Mongoose models
  │   ├── routes/              # API routes
  │   ├── types/               # TypeScript types
  │   ├── utils/               # Utility functions
  │   ├── app.ts, index.ts     # Entry points
  │   ├── secret.ts            # AI prompt secret(create and import in Image Controller)
  ├── .env, .env.sample        # Environment variables
  ├── package.json, tsconfig.json
FrontEnd/
  └── ThumbPie/
      ├── src/                 # React source files
      ├── public/              # Static assets
      ├── package.json, vite.config.ts, tsconfig.json
```

## Installation Steps

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account

>**NOTE** :
> add **secret.ts** file in your **src** dir before running the server *..*

### Backend Setup

```sh
cd BackEnd
cp .env.sample .env # Fill in your secrets
npm install
npm run dev
```

### Frontend Setup

```sh
cd FrontEnd/ThumbPie
npm install
npm run dev
```

## Usage Guide

- Register and log in to create sessions
- Generate images using the AI prompt
- View and manage your image history
- Example API call:

```sh
curl -X POST http://localhost:5000/api/v1/images/image/new -H "Authorization: Bearer <token>" -d '{
"prompt": "A sunset over mountains",
"sessionId":"<your session ID from session document>",
"UserImage":"<file>"
}'
```

## Environment Variables

See `.env.sample` for required variables:

- `MONGODB_URI`
- `CLOUDINARY_URL`
- `JWT_SECRET`
- `AI_API_KEY`

> `see **env.sample** file for more`

## Contributing Guidelines

- Fork the repo and create a feature branch
- Follow code style and naming conventions
- Submit pull requests with clear descriptions

## License

MIT License

## Contact / Author

- Author: Rahul Vyas
- Email: rahul.vyas@example.com
- GitHub: [rahul-vyas-dev](https://github.com/rahul-vyas-dev)


---
