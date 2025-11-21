# 🏋️‍♂️ FitTrack - Modern Fitness Transformation App

![FitTrack Banner](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)

> A premium, responsive, and interactive fitness tracking application designed to help you crush your transformation goals. Built with modern web technologies for a seamless user experience.

## ✨ Features

-   **📊 Interactive Dashboard**: Get a bird's-eye view of your progress with real-time stats, daily streaks, and workout previews.
-   **✅ Daily Tracker**: A gamified checklist for your habits, meals, and workouts. Track your wins every single day.
-   **🌗 Dark/Light Mode**: A stunning UI that adapts to your preference. Switch between a sleek "Cyber Dark" mode and a clean "Day" mode with a single click.
-   **📅 Smart Schedule**: Automatically displays your daily workout focus (Push/Pull/Legs) based on the day of the week.
-   **📈 Progress Analytics**: Visualize your weight loss journey with interactive charts and goal tracking.
-   **📱 Fully Responsive**: Optimized for all devices—from large desktop monitors to mobile phones. Includes a smooth mobile navigation drawer.

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/) for lightning-fast performance.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4) for a utility-first, custom design system.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) for buttery-smooth transitions and interactions.
-   **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent iconography.
-   **State Management**: React Context API + LocalStorage for persistence (no backend required!).
-   **Routing**: React Router DOM (v7).

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/fitness-tracker.git
    cd fitness-tracker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to see the app in action!

## 📂 Project Structure

```
fitness-tracker/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Sidebar, Layout wrappers
│   │   └── ui/          # ThemeToggle, StatCard, etc.
│   ├── context/         # Global State (StoreContext)
│   ├── data/            # Static Data (Master Plan, Schedule)
│   ├── pages/           # Main Application Pages
│   ├── App.jsx          # Main Router Setup
│   ├── main.jsx         # Entry Point
│   └── index.css        # Global Styles & Tailwind Config
├── public/              # Static Assets
└── package.json         # Dependencies & Scripts
```

## 🎨 Customization

### Changing the Plan
You can easily update the diet, workout schedule, or habits by editing the `src/data/masterPlan.js` file. The app will automatically reflect your changes.

### Theming
The app uses CSS variables for theming. You can adjust the colors in `src/index.css` under the `:root` and `:root.light` selectors.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by Gaurav Singh
</p>
