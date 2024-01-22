<div>
<img alt="Codecov" src="https://img.shields.io/codecov/c/github/blogify-app/blogify-web">
</div>

# Blogify 📑✨

Welcome to Blogify, where words come to life and stories find their digital home! Blogify is more than just a blog app; it's a vibrant community of passionate writers, storytellers, and readers coming together to share, explore, and engage in the art of blogging.

## We are live:

<<<<<<< HEAD
- [preprod](https://blogify-preprod.vercel.app)
=======
- [preprod](https://blogify-preprod-kvu9aymiz-blogify-app.vercel.app)
>>>>>>> c825f02 (format code)
- [prod](https://blogify-prod.vercel.app)

## Overview

This repository contains essential information and guidelines for understanding and contributing to our project. Please read through this README to familiarize yourself with our Definitions Of Done (DoD) and find links to our frontend and backend repositories.

## Definitions Of Done (DoD)

The Definitions Of Done (DoD) for our project are aligned with the professor's requirements:

1. **Authentication & Authorization System:**

   - a) Visitors can access the blog without authentication.
   - b) Users must be logged in to publish an article.

2. **Data Collection:**

   - Implement a robust system for collecting and managing data.

3. **Recommendation System:**
   - Develop a recommendation system to enhance the user experience.

## About the App repository

Bootstrapped using [Proplate](https://github.com/YumeT023/proplate) from the [Modern-react-ts](https://github.com/YumeT023/modern-react-ts/tree/master) template.

### Pages & Features Added

- **Home Page:** An engaging landing page welcoming users to the Blogify community. (beta version)
- **Sign In Page:** Allow users to log in to their accounts.
- **Sign Up Page:** Enable new users to create an account.
- **Blog Reading Page:** A dedicated page for reading blog posts with comments.
- **User Profile Page:** Display user profiles with relevant information.
- **Blogs List Page:** A page listing all available blogs.

### How to install locally?

#### Requirements:

- Install **node.js** (`^16.0.0` || `^18.0.0`) [https://nodejs.org/en/download](https://nodejs.org/en/download)
- Install **yarn** globally [https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

#### Installation

- Clone the repository
- Install dependencies `yarn install`
- Run the dev server: `yarn dev`
- Build: `yarn build`
- Check the <u>package.json</u> for more commands:

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "preview": "vite preview",
  "gen-cmp": "shadcn-ui add",
  "test:e2e": "cypress run --spec cypress/e2e/**/*",
  "test:unit": "cypress run --component",
  "test:open": "cypress open",
  "test:e2e:ci": "concurrently \"yarn dev\" \"yarn test:e2e\"",
  "test:ci": "test:unit && test:e2e:ci"
}
```

### Upcoming Features

- Recommandation system AI
- Posts list
- A fancy ✨ user interface

## Known Issues

Help us find bugs !
Report issues here:

- [https://github.com/blogify-app/blogify-web/issues](https://github.com/blogify-app/blogify-web/issues)

## How to Contribute

We welcome contributions from the community! If you're interested in contributing to our project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they meet the Definitions Of Done.
4. Test your changes thoroughly.
5. Create a pull request, detailing the changes you've made.

## Getting Help

If you have any questions or need assistance, feel free to reach out to us through the project's GitHub issues.

Thank you for being a part of The Maestro Project - Blogify! 🚀
