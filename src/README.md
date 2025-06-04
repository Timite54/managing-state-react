# TaskFlow - Todo List Application

A beautifully designed task management application built with React and TypeScript, featuring task creation, editing, deletion, and completion status tracking.

## Features

- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Form Validation**: Ensures task titles and descriptions are filled out
- **Persistent Storage**: Tasks are saved in localStorage and persist between sessions
- **Filter Options**: Filter tasks by their completion status
- **Responsive Design**: Works beautifully on all devices
- **Delete Confirmation**: Confirms before deleting tasks to prevent accidents

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to the local development URL shown in your terminal

## Project Structure

```
src/
├── components/         # UI components
│   ├── TaskForm.tsx    # Form for adding and editing tasks
│   ├── TaskList.tsx    # List of all tasks
│   ├── TaskItem.tsx    # Individual task item
│   ├── TaskFilter.tsx  # Filter controls
│   └── ConfirmDialog.tsx  # Confirmation dialog for deletions
├── hooks/
│   └── useLocalStorage.ts  # Custom hook for localStorage
├── types/
│   └── index.ts        # TypeScript interfaces
├── utils/
│   └── taskUtils.ts    # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Implementation Details

- Built with React and TypeScript
- Styled with Tailwind CSS
- Uses local browser storage for data persistence
- Implements form validation for task creation and editing
- Features a responsive design for all device sizes

## License

[MIT](LICENSE)