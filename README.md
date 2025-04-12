# Civil Engineering Resource Hub

A centralized academic resource hub for Civil Engineering students. This MERN stack application aggregates all semester-specific links in one place, enabling students to save time, reduce effort, and increase productivity by having quick access to all essential resources with just one click.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The **Civil Engineering Resource Hub** is designed specifically for Civil Engineering students. It provides a single portal to all departmental and academic links, organized semester-wise in an intuitive card-based layout. This platform saves students valuable time by consolidating all resources in one place.

Inspired by the [LinkHUb](https://github.com/Xantonozar/LinkHUb) project, this application leverages the dynamic MERN stack and Next.js framework to deliver a modern, responsive, and engaging user experience.

---

## Features

- **Centralized Resource Access:**  
  All academic and departmental links for each semester (1-1, 1-2, 2-1, 2-2, 3-1, 3-2, 4-1, 4-2) are consolidated into a single hub.

- **Interactive Hero Section:**  
  A visually appealing hero section with high-resolution backgrounds, animated SVG overlays, and a concise message: “All your academic resources in one place—save time, reduce effort, and boost productivity.”

- **Card-Based Navigation:**  
  Semester cards with smooth hover effects and responsive design lead to detailed resource pages for each semester.

- **Fully Responsive Design:**  
  Optimized for desktops, tablets, and mobile devices, ensuring a seamless experience across all platforms.

- **Modern MERN Stack Architecture with Next.js:**  
  Built with Next.js for server-side rendering (SSR), Node.js, Express.js, and MongoDB, ensuring scalability, dynamic content management, and improved SEO.

---

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) for UI development and server-side rendering
  - [React.js](https://reactjs.org/) as the core UI library
  - Styling: [Tailwind CSS](https://tailwindcss.com/) or [Material UI](https://mui.com/)

- **Backend:**
  - [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) for RESTful APIs

- **Database:**
  - [MongoDB](https://www.mongodb.com/) for storing semester-specific resource data

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v12 or higher)
- npm or yarn package manager
- MongoDB (local or cloud instance)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Xantonozar/LinkHUb.git
   cd LinkHUb
   ```

2. **Setup the Backend:**

   Navigate to the `server` directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file with the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

   Start the backend server:

   ```bash
   npm start
   ```

3. **Setup the Frontend:**

   Open a new terminal, navigate to the `client` directory, and install dependencies:

   ```bash
   cd ../client
   npm install
   ```

   Start the Next.js development server:

   ```bash
   npm run dev
   ```

4. **Access the Application:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the Civil Engineering Resource Hub.

---

## Usage

- **Landing Page:**  
  Features a hero section explaining the platform's purpose and a call-to-action button that leads to a semester card grid.

- **Semester Navigation:**  
  Clicking on a semester card (e.g., "Semester 1-1") redirects users to a detailed page with all relevant links.

- **Interactive UI:**  
  Enjoy smooth animations, hover effects, and responsive transitions designed for an engaging user experience.

---

## Project Structure

```plaintext
LinkHUb/
├── client/                # Next.js frontend
│   ├── public/            # Static assets and index.html
│   └── src/
│       ├── components/    # Reusable components (Hero, CardGrid, Navbar, etc.)
│       ├── pages/         # Next.js pages (LandingPage, SemesterPage, etc.)
│       ├── styles/        # Global and component-specific styles
│       ├── App.js         # Main app component
│       └── index.js       # Entry point for Next.js
├── server/                # Express backend
│   ├── controllers/       # API route handlers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   └── server.js          # Backend server entry point
├── README.md              # Project documentation
└── package.json           # Root package configuration
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your commit message"
   ```

4. Push to your branch and open a Pull Request.

Please ensure your contributions align with the guidelines in `CONTRIBUTING.md`.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

By consolidating all academic and departmental links into one intuitive hub, the **Civil Engineering Resource Hub** streamlines resource access for students—saving time and enhancing productivity. We hope you find the platform helpful and enjoy using it!
