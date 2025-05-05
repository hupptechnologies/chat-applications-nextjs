# Chat Application with Next.js

A modern real-time chat application built with Next.js, featuring Material-UI, Socket.IO, and TypeScript.

## Features

- Real-time messaging using Socket.IO
- Message status tracking (delivered/read)
- Online/offline user status
- Unread message count tracking
- User search functionality
- Modern UI with Material-UI components
- Form handling with Formik and Yup validation
- Protected and public routes
- Responsive dashboard layout
- TypeScript for type safety
- API routes for backend functionality

## Tech Stack

- **Frontend Framework**: Next.js 15.2.0
- **UI Library**: Material-UI (@mui/material)
- **State Management**: React Context
- **Form Handling**: Formik with Yup validation
- **Real-time Communication**: Socket.IO
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Styling**: Emotion (@emotion/react, @emotion/styled)

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd chat-applications-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── components/     # Reusable UI components (Sidebar, Header, ChatArea, etc.)
├── context/       # React context providers
├── interface/     # TypeScript interfaces and types
├── pages/         # Next.js pages and API routes
├── services/      # API and Socket.IO service integrations
├── styles/        # Global styles and CSS
├── theme/         # Material-UI theme configuration
└── utils/         # Utility functions and helpers
```

## Key Components

- **Authentication**: Login and signup pages with form validation
- **Dashboard**: Protected layout for authenticated users
- **Chat Interface**: 
  - Real-time messaging
  - Message status indicators
  - User online/offline status
  - Unread message tracking
  - User search functionality
- **Socket Integration**: Real-time communication and status updates

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Development

The application uses ESLint and Prettier for code quality and formatting. The configuration files are:
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
