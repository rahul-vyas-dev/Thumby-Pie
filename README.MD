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

gantt
    title ThumbyPie Feature Roadmap
    dateFormat  YYYY-MM-DD
    section Core System
    Project Setup              :done, 2025-11-01, 2d
    Auth + OTP System          :active, 2025-11-03, 4d
    User Dashboard             :2025-11-07, 4d

    section AI Thumbnail Engine
    AI Model Integration       :2025-11-11, 5d
    Image Enhancer             :2025-11-16, 4d
    Style Presets + Filters    :2025-11-20, 4d

    section Creator Tools
    Drag & Drop Editor         :2025-11-24, 6d
    Templates Marketplace      :2025-11-30, 7d

    section Production
    Testing + QA               :2025-12-07, 4d
    Deployment + Monitoring    :2025-12-11, 3d

flowchart TD
    A[Frontend - React/Next.js] --> B[Backend - Node.js / Express]
    B --> C[MongoDB Database]
    B --> D[Cloudinary - Image Storage]
    B --> E[AI Model API - Thumbnail Generation]
    B --> F[Email Service - OTP / Verification]
    A --> G[Client Auth Storage - JWT Cookies]
    A <--> B
    C <--> B
    D <--> B
    E <--> B
    F <--> B


mindmap
    root((ThumbyPie))
        Auth System
            OTP Login
            JWT Sessions
            Email Verification
        AI Generator
            Thumbnail Creation
            Style Presets
            Colour Variants
        User Dashboard
            Generated Images
            History
            Saved Templates
        Editor
            Drag & Drop
            Text & Layer Tools
            Export Options
        Storage
            Cloudinary Uploads
            DB Records
        Deployment
            CI/CD
            Monitoring
            Logs


sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant BE as Backend
    participant DB as MongoDB
    participant EM as Email Service
    participant AI as AI Generator API

    U->>FE: Enter email
    FE->>BE: Request OTP
    BE->>DB: Save OTP & expiry
    BE->>EM: Send OTP email
    EM-->>U: OTP Delivered

    U->>FE: Enters OTP
    FE->>BE: Verify OTP
    BE->>DB: Validate OTP
    BE->>FE: Return JWT

    U->>FE: Generate Thumbnail
    FE->>BE: Send text + style + image
    BE->>AI: Request generation
    AI-->>BE: Returns generated image
    BE->>Cloudinary: Upload
    BE-->>FE: Final image URL


flowchart TD
    A[Open ThumbyPie] --> B[Enter Email]
    B --> C[Receive OTP]
    C --> D[Verify OTP]
    D --> E[Dashboard]

    E --> F[Create Thumbnail]
    F --> G[Choose Style + Add Text]
    G --> H[Generate AI Image]
    H --> I[Preview]
    I --> J[Download or Edit More]

    J --> K[Save to History]
    K --> L[Logout]
