# Task Manager Application

A modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS. Track your progress with visual indicators, organize tasks by priority and category, and maintain productivity with an intuitive interface.

## Features

- ✅ **Task Management**: Create, edit, delete, and complete tasks
- 📊 **Progress Tracking**: Visual progress ring and detailed statistics
- 🏷️ **Categories & Priorities**: Organize tasks with custom categories and priority levels
- 🔍 **Search & Filter**: Find tasks quickly with search and filtering options
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 💾 **Local Storage**: Automatic data persistence between sessions
- 📅 **Due Dates**: Set and track task deadlines with overdue indicators
- 🎨 **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── TaskCard.tsx    # Individual task display
│   ├── TaskForm.tsx    # Task creation/editing form
│   ├── TaskStats.tsx   # Progress statistics display
│   └── ProgressRing.tsx # Circular progress indicator
├── hooks/              # Custom React hooks
│   └── useTasks.ts     # Task management logic
├── types/              # TypeScript type definitions
│   └── task.ts         # Task and stats interfaces
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Usage

### Creating Tasks

1. Click the "Add Task" button
2. Fill in the task details:
   - **Title**: Required task name
   - **Description**: Optional detailed description
   - **Priority**: High, Medium, or Low
   - **Category**: Custom category for organization
   - **Due Date**: Optional deadline

### Managing Tasks

- **Complete**: Click the checkbox to mark tasks as done
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove tasks

### Tracking Progress

- View overall completion percentage in the progress ring
- Monitor task statistics: total, completed, pending, and overdue
- Use filters to focus on specific task types

## Customization

The application uses Tailwind CSS for styling, making it easy to customize:

- Colors are defined using Tailwind's color palette
- Responsive breakpoints are handled automatically
- Component styles can be modified in individual component files

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Live Demo

View the live application: [Task Manager Demo](https://progress-tracking-ta-sqgw.bolt.host)