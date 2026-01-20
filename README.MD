<h1 align="center" style="margin-top: 30px;">
  <a
  href="https://atg-gilt.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit ATG project live demo website"
  title="ATG – Live Project Demo"
  >
    <img
    src="./FrontEnd/ThumbPie/dist/assets/ATG-DtKSfTyM.png"
    width="200"
    height="200"
    loading="lazy"
    decoding="async"
    style="
      border-radius: 20px;
      outline: 12px solid #d1d5dc;
      background-color: transparent;
    "
    alt="ATG project logo – modern web application interface"
    />
  </a>
</h1>

<!-- markdownlint-disable-next-line MD033 -->
<h3 align='center'>
<span style='font-size: 35px;'><b>Thumb-Pie - An Open Source Thought Generator</b></span>
</h3>

<p align='center'>
  <img src = "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src='https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white'>
</p>

---
<br>
Thumby-Pie is a full-stack web application designed to generate, manage, and share AI-powered images through an intuitive and modern interface. It provides secure user authentication and persistent session management, allowing users to seamlessly access their previously generated creations at any time.

Each session is automatically stored, enabling users to review, revisit, and re-edit earlier prompts and ideas without losing context. With a focus on usability, performance, and a smooth creative workflow, Thumby-Pie makes AI-driven image generation more organized, repeatable, and user-friendly.

## 🚀 Key Features

- AI-powered image generation
- User authentication and session management
- Image history and session tracking
- RESTful API backend
- Modern React frontend
- Cloudinary integration for image storage
- Re-Edit generated Image
- Blog Reading
- CRUD operation on each and every Session
- CRUD ooperation on each and every History/Chat

## 💻 Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind, zustand, react router dom, React hook form, axios, lucid react 
- **Backend:** Node.js, Express, TypeScript, Mongoose
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Other:** bcryptjs, multer, dotenv, resend(for Email send), [AbstractAi](https://www.abstractapi.com/)

<h2>🎥 Screenshots</h2>
<div align="center">
  <a
    href="https://atg-gilt.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit ATG project live demo website"
    title="ATG – Live Project Demo">
      <img
        src="./FrontEnd/ThumbPie/dist/assets/main.png"
        alt="Thumby-Pie main screen mobile view"
        style="border-radius: 16px; margin: 8px;"
      />
      <img
        src="./FrontEnd/ThumbPie/dist/assets/three.png"
        alt="Thumby-Pie image generation screen mobile view"
        style="border-radius: 16px; margin: 8px;"
      />
      <img
        src="./FrontEnd/ThumbPie/dist/assets/animate.png"
        alt="Thumby-Pie animation preview mobile view"
        style="border-radius: 16px; margin: 8px;"
      />
  </a>
</div>


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
      ├── dist/                # Static assets
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

# 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a feature or fix branch, and submit a pull request with a clear description of your changes. Please follow the existing code style and keep commits meaningful.

---

# 📍License

## MIT License

# 📫 Contact / Author

If you have any questions, need clarifications, or want to discuss ideas, feel free to reach out through the following channels:

- Author: [Rahul Vyas](https://www.linkedin.com/in/rahul-vyas-a60b83370)
- [Email](rahul.vyas@example.com)
- [Github](https://github.com/rahul-vyas-dev)
- [X](https://x.com/RahulVyas496824)

---
## Architecture Diagram

```mermaid
flowchart TD
    A[User] --> B[Frontend]
    B --> C[Backend API]
    C --> D[Database]
    C --> E[Cloud Storage]
