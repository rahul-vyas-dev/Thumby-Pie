# Contributing to ThumbPie

Thank you for your interest in contributing to **ThumbPie** 🎉

We welcome contributions of all kinds — bug fixes, feature enhancements, documentation improvements, refactors, and discussions. This document explains how to contribute effectively and consistently.

---

## Table of Contents

* [Code of Conduct](#code-of-conduct)
* [Project Overview](#project-overview)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Setup](#environment-setup)
* [Development Workflow](#development-workflow)
* [Branch Naming Convention](#branch-naming-convention)
* [Commit Message Guidelines](#commit-message-guidelines)
* [Pull Request Guidelines](#pull-request-guidelines)
* [Coding Standards](#coding-standards)
* [Reporting Issues](#reporting-issues)
* [Security Notes](#security-notes)

---

## Code of Conduct

Be respectful, inclusive, and professional.

* No harassment or discrimination
* Be open to feedback
* Keep discussions constructive

By contributing, you agree to follow these basic community rules.

---

## Project Overview

**ThumbPie** is a full‑stack application that allows users to:

* Register and authenticate
* Create sessions
* Generate AI‑based images using prompts
* Store and manage image history

The project uses:

* **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
* **Frontend**: React, Vite, TypeScript
* **Services**: Cloudinary, AI image generation APIs

---

## Project Structure

```
BackEnd/
  ├── src/
  │   ├── controllers/     # API logic
  │   ├── db/              # Database connection
  │   ├── emails/          # Email templates
  │   ├── helpers/         # Reusable helpers
  │   ├── middleware/      # Express middlewares
  │   ├── models/          # Mongoose schemas
  │   ├── routes/          # API routes
  │   ├── types/           # TypeScript types
  │   ├── utils/           # Utility functions
  │   ├── app.ts, index.ts # Entry points
  │   ├── secret.ts        # AI prompt secret (gitignored)
  ├── .env, .env.sample

FrontEnd/
  └── ThumbPie/
      ├── src/
      ├── dist/
      ├── vite.config.ts
      ├── ...
```

---

## Getting Started

### 1. Fork the Repository

Click the **Fork** button on GitHub and clone your fork locally:

```sh
git clone https://github.com/rahul-vyas-dev/Thumby-Pie
cd <repo-name>
```

### 2. Add Upstream Remote

```sh
git remote add upstream https://github.com/rahul-vyas-dev/Thumby-Pie
git fetch upstream
```

---

## Environment Setup

### Backend

```sh
cd BackEnd
cp .env.sample .env
npm install
npm run dev
```

> ⚠️ You **must** create `src/secret.ts` before running the server.

Example:

```ts
// src/secret.ts
export const AI_PROMPT_SECRET = "your-secret-prompt";
```

### Frontend

```sh
cd FrontEnd/ThumbPie
npm install
npm run dev
```

---

## Development Workflow

1. Pull latest changes from upstream

   ```sh
   git checkout main
   git pull upstream main
   ```

2. Create a new branch

   ```sh
   git checkout -b feat/your-feature-name
   ```

3. Make your changes

4. Test locally

5. Commit and push

---

## Branch Naming Convention

Use descriptive, lowercase branch names:

* `feat/feature-name`
* `fix/bug-description`
* `refactor/code-cleanup`
* `docs/update-readme`
* `chore/dependency-update`

---

## Commit Message Guidelines

Follow a clear and consistent format:

```
<type>: <short description>
```

Examples:

* `feat: add image session history`
* `fix: resolve token validation bug`
* `docs: update environment setup`
* `refactor: simplify image controller`

---

## Pull Request Guidelines

Before opening a PR:

* Ensure code builds without errors
* Follow existing folder structure
* Do not commit secrets or `.env` files
* Rebase on latest `main`

### PR Description Should Include:

* What problem does this solve?
* What changes were made?
* Screenshots (for UI changes)
* Related issue number (if any)

---

## Coding Standards

### Backend

* Use **TypeScript** strictly
* Validate request data
* Use async/await (no promise chains)
* Keep controllers thin, move logic to helpers

### Frontend

* Use functional components
* Prefer hooks over class components
* Keep components small and reusable
* Follow existing formatting and naming

---

## Reporting Issues

When opening an issue, include:

* Clear title
* Steps to reproduce
* Expected vs actual behavior
* Screenshots or logs if applicable

Avoid duplicate issues by searching first.

---

## Security Notes

* Never commit secrets (`.env`, `secret.ts`)
* Report security issues privately
* Do not expose API keys in frontend code

---

## Final Notes

<p align='center'><b> Every contribution matters 💙</b></p>

Whether it’s fixing a typo, improving performance, or adding a feature — thank you for helping make **ThumbPie** better.

## Happy Coding 🚀
