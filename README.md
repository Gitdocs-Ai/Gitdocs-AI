# Gitdocs.ai

[![License](https://img.shields.io/badge/License--blue.svg)](LICENSE)
[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_GITHUB_USERNAME%2FGitdocs.ai)

<!-- Replace YOUR_GITHUB_USERNAME with your actual GitHub username -->

## Project Overview

Gitdocs.ai is a SaaS platform designed to streamline documentation creation for GitHub repositories. It addresses the common problem of outdated or missing READMEs by automatically generating comprehensive and professional documentation directly from your codebase. Leveraging AI, Gitdocs.ai analyzes your repository's contents and creates a well-structured README tailored to your project's specific purpose and functionality. Our value proposition is simple: **Save time and effort while ensuring your projects are well-documented and easily understood by collaborators and users.**

## Key Features

- **AI-Powered README Generation:** Automatically generates READMEs from your codebase using advanced AI models (Gemini, ChatGPT, DeepSeek).
- **GitHub Integration:** Seamlessly connect to your GitHub repositories for direct access and analysis of your code.
- **Direct Commit:** Commit generated READMEs directly to your repository with a single click.
- **User Authentication:** Secure user accounts managed with Clerk.
- **Payment Gateway:** Integrated payment processing for subscription management.
- **API Protection:** Robust API security measures, including rate limiting, to prevent abuse.
- **Customizable Templates:** Choose from a variety of README templates or create your own.
- **Real-time Preview:** Preview the generated README before committing it to your repository.

## Visual Demo

> _Add screenshots or GIFs showcasing the main features of Gitdocs.ai here._ > _For example, show the process of connecting to a GitHub repo, generating a README, and committing it._

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v18 or higher ([https://nodejs.org/](https://nodejs.org/))
- **npm:** v8 or higher (comes with Node.js) or **yarn:** v1.22 or higher ([https://yarnpkg.com/](https://yarnpkg.com/)) or **pnpm:** v7 or higher ([https://pnpm.io/](https://pnpm.io/))
- **MongoDB:** Ensure you have a MongoDB instance running or a MongoDB Atlas account.
- **Clerk Account:** Create a Clerk account for user authentication.
- **Vercel CLI (optional):** For deploying to Vercel.

## Installation

Follow these steps to set up Gitdocs.ai locally:

1.  **Clone the repository:**

bash
npm install # or yarn install or pnpm install
bash
npm run dev # or yarn dev or pnpm dev
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Gitdocs.ai provides several configurable options through environment variables. Here are some key configurations:

- **AI Model Selection:** You can choose which AI model (Gemini, ChatGPT, DeepSeek) to use for README generation by setting the appropriate API key. If multiple keys are provided, the application can be configured to dynamically switch between them.

javascript
// Example (using a middleware library like `express-rate-limit`)
const rateLimit = require('express-rate-limit');

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: "Too many requests, please try again later."
    });

    app.use('/api/', limiter);

    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
    *   **Clerk Authentication:** Ensure your Clerk publishable and secret keys are correctly configured. Review Clerk's documentation for advanced configuration options, such as custom domains and user roles.

## Usage

### Basic Usage

1.  **Sign up/Log in:** Create an account or log in using Clerk authentication.
2.  **Connect to GitHub:** Connect your GitHub account to Gitdocs.ai.
3.  **Select a Repository:** Choose the repository you want to generate a README for.
4.  **Generate README:** Click the "Generate README" button.
5.  **Review and Edit:** Review the generated README and make any necessary edits.
6.  **Commit to GitHub:** Commit the generated README directly to your repository.

### Advanced Usage

- **Custom Templates:** Create and use custom README templates to tailor the generated documentation to your specific needs.
- **AI Model Selection:** Select a specific AI model (if multiple are configured) for README generation.
- **Configuration Options:** Utilize configuration options (if available) to fine-tune the AI generation process (e.g., specify the level of detail).

### Code Examples (API Usage)

> _This assumes you expose your AI functionality via an API endpoint._

try{

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.readmeContent;

} catch (error) {
console.error("Error fetching README:", error);
return null;
}

## API Documentation

> _Describe the API endpoints available for Gitdocs.ai._

### `POST /api/generate-readme`

- **Description:** Generates a README for a given GitHub repository.
- **Parameters:**
    - `repo` (string, required): The name of the GitHub repository (e.g., "username/repo-name").
    - `model` (string, optional): The AI model to use for generation (e.g., "gemini", "chatgpt", "deepseek"). If not provided, the default model will be used.
- **Request Body:** (optional)
  json
  {
  "readmeContent": "The generated README content (Markdown format)."
  }
  json
  [
  {
  "name": "repo1",
  "owner": "user1"
  },
  {
  "name": "repo2",
  "owner": "user1"
  }
  ]
    - **"Failed to connect to GitHub":** Ensure your GitHub credentials (Client ID and Secret) are correctly configured in the `.env.local` file. Also, verify that the callback URL in your GitHub OAuth app settings matches the URL of your Gitdocs.ai instance.
- **"AI model API key invalid":** Double-check that your API keys for the AI models (Gemini, ChatGPT, DeepSeek) are valid and correctly entered in the `.env.local` file.
- **"Rate limit exceeded":** Wait for the rate limit to reset before making further requests. Consider upgrading your subscription for higher rate limits.
- **"MongoDB connection error":** Verify that your MongoDB connection string is correct and that your MongoDB instance is running and accessible.

## Performance Considerations

- **AI Model Selection:** Different AI models have different performance characteristics. Consider the trade-offs between generation speed and quality when selecting an AI model.
- **Caching:** Implement caching mechanisms to store frequently accessed data and reduce the load on the database and AI APIs.
- **Database Optimization:** Optimize your MongoDB queries and indexes for faster data retrieval.
- **Image Optimization:** Optimize images in your READMEs to reduce file size and improve loading times.

## Security Notes

- **Environment Variables:** Never commit your `.env.local` file to your repository. Use environment variables or a secrets management system for sensitive information.
- **API Authentication:** Implement robust authentication and authorization mechanisms for your API endpoints.
- **Rate Limiting:** Enforce rate limits to prevent abuse and denial-of-service attacks.
- **Input Validation:** Validate all user inputs to prevent injection attacks.
- **Regular Security Audits:** Conduct regular security audits to identify and address potential vulnerabilities.

## Roadmap

- **Support for more AI models:** Integrate additional AI models to provide users with more choices.
- **Improved template customization:** Allow users to create more complex and flexible README templates.
- **More detailed code analysis:** Enhance the AI's ability to analyze code and generate more accurate and comprehensive READMEs.
- **Integration with other documentation tools:** Integrate with other documentation tools, such as Sphinx and Docusaurus.
- **Support for multiple languages:** Offer README generation in multiple languages.
- **Team collaboration features:** Allow multiple users to collaborate on README generation and editing.

## Contributing Guidelines

We welcome contributions to Gitdocs.ai! Please follow these guidelines:

1.  **Fork the repository:** Fork the Gitdocs.ai repository to your GitHub account.
2.  **Create a branch:** Create a new branch for your feature or bug fix.
3.  **Make your changes:** Make your changes and commit them with clear and concise commit messages.
4.  **Test your changes:** Test your changes thoroughly.
5.  **Submit a pull request:** Submit a pull request to the main branch of the Gitdocs.ai repository.

Please ensure your code follows the existing coding style and includes appropriate unit tests.

## License Information

This project is licensed under the [MIT License](LICENSE).

## Contact/Support Details

For questions, bug reports, or feature requests, please contact us at:

- **Email:** abhas.kumar@gitdocs.space
- **GitHub Issues:** [https://github.com/YOUR_GITHUB_USERNAME/Gitdocs.ai/issues](https://github.com/YOUR_GITHUB_USERNAME/Gitdocs.ai/issues)

> _Replace `YOUR_GITHUB_USERNAME` with your GitHub username._
