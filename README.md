# Count - Pomodoro Timer Web Application

A clean and functional Pomodoro timer web application built with HTML, CSS, and JavaScript. Count helps users improve productivity and time management through focused work sessions and scheduled breaks.

## Features

### Core Timer Functionality
- Countdown timer with Work and Break modes
- Customizable durations for both work and break sessions
- Start, pause, and reset functionality
- Visual indication of current timer mode
- Audible alerts when timer sessions end
- Automatic break countdown during pause

### User Interface
- Clean and intuitive design
- Responsive layout that works on all screen sizes
- Input fields for setting custom work and break durations
- Clear timer display with prominent countdown
- Visual feedback for timer status (running, paused, finished)
- Dark mode support with toggle switch

### Template System
- 4 pre-configured timer features:
  - Intense Work (50min work, 10min break)
  - Workout Session (45min work, 15min break)
  - Focus Session (25min work, 5min break)
  - Quick Task (10min work, 2min break)

### Additional Features
- Task management with custom task naming
- Three-page navigation (Home, Timer, Settings)
- Mobile-friendly sidebar navigation
- Settings page with preferences
- Progressive Web App (PWA) ready

## Technical Requirements

### Languages Used
- HTML5
- CSS3
- JavaScript (ES6+)

### Browser Compatibility
- Modern browsers supporting ES6+ features
- Web Audio API support for sound notifications
- CSS Grid and Flexbox support

### No External Dependencies
- Pure vanilla JavaScript implementation
- No frameworks or libraries required
- Self-contained single HTML file

## Installation and Usage

### Quick Start
1. Download the HTML file
2. Open in any modern web browser
3. Start using the timer immediately

### Local Development
1. Clone or download the project
2. Open `index.html` in your browser
3. No build process or server required

### Deployment
- Can be hosted on any static web server
- Works offline after initial load
- No backend requirements

## Project Structure

### HTML Structure
- Semantic HTML5 markup
- Accessible navigation and controls
- Mobile-first responsive design

### CSS Architecture
- CSS Grid and Flexbox layouts
- CSS custom properties for theming
- Mobile-responsive design patterns
- Dark mode implementation
- Smooth transitions and animations

### JavaScript Architecture
- Object-oriented class structure
- Event-driven programming
- DOM manipulation
- Timer management with setInterval
- State management for different modes
- Audio generation using Web Audio API

## Key Components

### CountTimer Class
Main application class that handles:
- Timer state management
- UI updates and interactions
- Template selection
- Navigation between pages
- Audio notifications
- Break countdown functionality

### Core Methods
- `startTimer()`: Initiates countdown
- `pauseTimer()`: Pauses timer and starts break countdown  
- `stopTimer()`: Stops and resets timer
- `sessionComplete()`: Handles session transitions
- `updateDisplay()`: Updates timer display
- `selectTemplate()`: Applies template settings

### Event Management
- Button click handlers
- Input field change listeners
- Navigation event handling
- Mobile menu interactions
- Template card selections

## Responsive Design

### Breakpoints
- Desktop: 768px and above (sidebar visible)
- Tablet: 768px and below (collapsible sidebar)
- Mobile: 480px and below (optimized layout)

### Mobile Features
- Collapsible sidebar navigation
- Touch-friendly controls
- Optimized timer display sizing
- Responsive grid layouts

## Browser Features

### Web Audio API
- Generates completion sounds programmatically
- No external audio files required
- Cross-browser compatibility

### Local State Management
- All data stored in memory during session
- No localStorage or external storage
- Privacy-focused approach

## Customization

### Timer Settings
- Work duration: 1-120 minutes
- Break duration: 1-60 minutes
- Real-time input validation
- Template-based quick setup

### Visual Customization
- Light and dark theme support
- Clean, professional design
- Customizable through CSS variables

## Performance

### Optimization Features
- Lightweight codebase
- Minimal resource usage
- Efficient timer implementation
- Smooth animations with CSS transforms

### Loading
- Single HTML file
- No external dependencies
- Fast initial load time
- Works offline after first visit

## Accessibility

### Features
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Clear visual feedback

## Browser Support

### Recommended Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Web Audio API (for sound notifications)
- CSS Custom Properties

## License

This project is open source and available for personal and educational use.

## Contributing

Contributions are welcome. Please ensure code follows the existing patterns and maintains the clean, dependency-free architecture.

## Contact

For questions or suggestions about the Count Pomodoro Timer, please create an issue in the project repository.