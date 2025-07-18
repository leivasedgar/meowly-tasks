# 🐱 Meowly Tasks

A purr-fectly delightful cat-themed to-do application that helps you chase down your daily tasks like a cat chasing mice! Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### 📝 Task Management
- **Add Tasks**: Create new tasks with titles, notes, dates, times, and tags
- **Edit Tasks**: Swipe right or use the edit button to modify existing tasks
- **Delete Tasks**: Swipe left to remove completed or unwanted tasks
- **Mark Complete**: Check off tasks when you've caught all your mice!

### 🏷️ Organization
- **Priority Levels**: Set tasks as Low, Medium, or High priority with cute cat-themed icons
- **Tags**: Organize tasks with custom tags for easy categorization
- **Due Dates & Times**: Never miss an important appointment or feeding time

### 🔍 Filtering & Sorting
- **Smart Filters**: Filter by priority, tags, or date ranges
- **Flexible Sorting**: Sort by priority, tags, or dates in ascending/descending order
- **Separate Tab States**: Different filters and sorting for To-Do and Completed tabs

### 📱 User Experience
- **Responsive Design**: Works perfectly on mobile and desktop
- **Touch Gestures**: Swipe to edit or delete tasks on mobile devices
- **Persistent Storage**: Your tasks are saved locally in your browser
- **Cat-Themed UI**: Adorable cat paws, fish icons, and playful messaging

## 🚀 Live Demo

Check out the live application: [Meowly Tasks](https://meowlytasks.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cat-themed design
- **Icons**: Font Awesome for beautiful iconography
- **Fonts**: Baloo 2 (headings) and Nunito (body text)
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for seamless hosting

## 🎨 Design Philosophy

Meowly Tasks combines functionality with feline fun:

- **Color Palette**: Soft mint greens, warm blues, and playful accent colors
- **Typography**: Friendly, rounded fonts that feel approachable
- **Interactions**: Smooth animations and micro-interactions for delightful UX
- **Cat Theme**: Subtle cat references throughout without being overwhelming

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── TaskForm.tsx    # Task creation/editing modal
│   ├── TaskItem.tsx    # Individual task display
│   ├── FilterModal.tsx # Filtering interface
│   └── SortModal.tsx   # Sorting options
├── constants/          # App constants
│   └── Colors.ts       # Color scheme definitions
├── types/              # TypeScript type definitions
│   └── Task.ts         # Task and filter types
├── utils/              # Utility functions
│   ├── taskStorage.ts  # Local storage management
│   └── taskFilters.ts  # Filtering and sorting logic
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🏃‍♀️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meowly-tasks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎮 How to Use

1. **Adding Tasks**: Click the fish button (🐟) to create a new task
2. **Managing Tasks**: 
   - Swipe right to edit a task
   - Swipe left to delete a task
   - Tap the checkbox to mark as complete
3. **Organizing**: Use the filter (🔍) and sort (📊) buttons to organize your view
4. **Switching Views**: Toggle between "To-Do" and "Completed" tabs

## 🎯 Key Features Explained

### Priority System
- **High Priority** (🚨): Urgent tasks that need immediate attention
- **Medium Priority** (⚠️): Important but not urgent tasks
- **Low Priority** (❗): Nice-to-have tasks for when you have time

### Smart Filtering
- Filter by multiple priorities simultaneously
- Search by tags with partial matching
- Date range filtering for time-sensitive planning

### Responsive Design
- Mobile-first approach with touch-friendly interactions
- Swipe gestures for quick task management
- Optimized for both portrait and landscape orientations

## 🤝 Contributing

This is a personal project, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐾 Fun Cat Facts

Did you know cats sleep 12-16 hours a day? That's why this app is perfect for managing the few hours when you're actually awake and productive! 😸

---

**Made with ❤️ and lots of ☕ for all the cat lovers who need to stay organized!**

*Meow-nage your tasks like a pro! 🐱*