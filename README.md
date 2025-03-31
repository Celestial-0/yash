# Yash Kumar Singh Portfolio

Welcome to my humble chronicle of creative growth and thoughtful problem-solving. I’m a passionate Full-Stack Developer who transforms challenges into scalable, high-performance solutions using the MERN and Django stacks. Join me on a journey through evolving data structures, innovative algorithms, and groundbreaking AI/ML projects that embody both technical excellence and creative spirit.


## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
  - [Core Framework & Build Tools](#core-framework--build-tools)
  - [Styling & Theming](#styling--theming)
  - [UI Components & Libraries](#ui-components--libraries)
  - [Motion & Animations](#motion--animations)
  - [Utility Libraries & Helpers](#utility-libraries--helpers)
  - [GraphQL & API Interaction](#graphql--api-interaction)
  - [Additional Tooling & Libraries](#additional-tooling--libraries)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This portfolio is built using modern web development technologies to ensure a fast, reliable, and visually appealing experience. It features a dynamic interface that supports server-side rendering and static generation, and it leverages the best practices in code quality and performance.

## Tech Stack

### Core Framework & Build Tools

- **Next.js (v15.2.4):** The primary React framework used for server-rendered and statically generated applications.
- **TypeScript (v5.8.2):** Provides static type checking to improve code quality and development efficiency.
- **ESLint & Prettier:** Enforces code quality and maintains consistent code formatting with Next.js-specific linting rules.

### Styling & Theming

- **Emotion:** CSS-in-JS libraries (`@emotion/react` and `@emotion/styled`) for component-scoped styling.
- **Tailwind CSS (v3.4.17):** Utility-first CSS framework for rapid UI development, enhanced with `tailwind-merge` and `tailwindcss-animate`.
- **SCSS & Sass:** Used for advanced CSS management and preprocessing capabilities.

### UI Components & Libraries

- **Magic UI (Custom Redefined):** Utilizes Magic UI components that have been redefined to align with the unique design requirements of this project.
- **Radix UI:** Offers accessible, unstyled UI primitives which can be customized as needed.
- **ShadCN UI:** Modern UI components designed for contemporary styling patterns.
- **React Icons & Lucide:** A collection of scalable vector icons to enrich the UI.
- **Material UI (MUI):** Provides a rich set of pre-built components following Material Design principles.


### Motion & Animations

- **Framer Motion (v11.18.2) & Motion (v12.5.0):** Enables smooth animations and transitions within the application.
- **React Tooltip:** Adds interactive tooltip functionality for enhanced user experience.

### Utility Libraries & Helpers

- **Axios & Node-Fetch:** HTTP client libraries to handle API requests efficiently.
- **Date-FNS (v4.1.0):** Facilitates date manipulation and formatting.
- **Classnames & clsx:** Helps with dynamic and conditional CSS class management.
- **Cobe:** Used for creative visualizations or data processing tasks.
- **Other Tools:** Includes `dotenv` for managing environment variables, `fs-extra` for file system operations, and additional utilities to streamline development.

### GraphQL & API Interaction

- **Custom GraphQL API for GitHub & LeetCode:**  
  Implements an aggressive GraphQL API that integrates with both GitHub and LeetCode. This custom API employs batch data fetching techniques to optimize performance and minimize HTTP requests.


### Additional Tooling & Libraries

- **SVGR & Webpack:** Transforms SVG files into React components, making it easier to incorporate scalable vector graphics.
- **Next Themes & Vercel Analytics:** Manages theme switching (e.g., dark/light mode) and integrates performance analytics from Vercel.
- **CLI Tools:** Utilizes `chalk`, `commander`, and `ora` for command-line functionality and build scripts.

Below is the revised markdown for the sections following **Getting Started**:


## Getting Started

To set up the project locally and start exploring the code, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/yash.git
   cd your-portfolio-repo
   ```

2. **Install Dependencies:**
   Choose your preferred package manager:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

Below is the updated **Getting Started** section with the added note about the `GITHUB_TOKEN` environment variable:


3. **Configure Environment:**
   Duplicate the `.env.example` file (if available) to create a `.env.local` file and update it with your specific environment variables. **Note:** Make sure to add a valid `GITHUB_TOKEN` in your `.env.local` file for GitHub API interactions.


4. **Run the Development Server:**
   Start your development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

5. **Customize & Explore:**
   Open the project in your favorite editor (e.g., VS Code) and begin tailoring the portfolio to your needs.

## Deployment

This portfolio is deployed on [Vercel](https://vercel.com/), which provides seamless continuous deployment and global distribution. For deployment details:

- Check out the [Vercel Documentation](https://vercel.com/docs) for setup and integration guidelines.
- Ensure your Vercel project settings include the required environment variables and build commands.

## Contributing

Contributions are welcome! If you have ideas for enhancements, found a bug, or want to improve documentation, please follow these steps:

- **Fork** the repository.
- **Create a new branch** for your changes.
- **Submit a pull request** with a detailed description of your improvements or fixes.

For major changes, please open an issue first to discuss your proposed modifications.

## License

This project is open-sourced under the [MIT License](LICENSE). Feel free to explore and adapt the code as needed under the terms of the license.

## Contact

For any questions, collaborations, or suggestions, feel free to reach out:

- **Email:** [yashkumarsingh@ieee.org](mailto:yashkumarsingh@ieee.org)
- **Twitter:** [@Celestial_Yash](https://x.com/Celestial_Yash) 
- **Instagram:** [@yash.kumar.singh.30](https://www.instagram.com/yash.kumar.singh.30/) 

Thank you for taking a look at my portfolio!
