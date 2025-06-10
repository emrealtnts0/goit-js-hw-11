# Image Search Application

A modern, feature-rich image search application built with Vite, featuring a beautiful UI and advanced functionality.

## 🚀 Live Demo

[View Live Demo](https://emrealtnts0.github.io/goit-js-hw-11/)

## 📋 Task Requirements

This project implements an image search application with the following core features:

### ✅ Core Features
- **Search Form**: HTML form for entering search terms
- **HTTP Requests**: Integration with Pixabay API
- **Gallery Display**: Responsive image gallery with cards
- **SimpleLightbox**: Modal image viewing functionality
- **Loading Indicator**: Visual feedback during API requests
- **Error Handling**: Proper error messages using iziToast

### 🔧 Technical Requirements
- Built with **Vite** for fast development and optimized builds
- Uses **iziToast** for notifications and error messages
- Implements **SimpleLightbox** for image modal viewing
- Includes **css-loader** for beautiful loading animations
- Console-free of errors, warnings, and logs
- Prettier-formatted code

### 🎨 Enhanced Features (Bonus)
- **Dark/Light Theme Toggle**: Switch between themes with smooth transitions
- **Search History**: Dropdown with recent searches
- **Advanced Filters**: Filter by image type, orientation, and sort options
- **Quick Categories**: One-click search for popular categories
- **Favorites System**: Save and manage favorite images
- **Infinite Scroll**: Automatic loading when scrolling to bottom
- **Responsive Design**: Works perfectly on all screen sizes
- **Keyboard Shortcuts**: Ctrl+K for search, Escape to close
- **Local Storage**: Persists theme, history, and favorites

## 🛠️ Technologies Used

- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Advanced styling with CSS variables and animations
- **Pixabay API** - Image search and retrieval
- **iziToast** - Beautiful notifications
- **SimpleLightbox** - Image modal viewing
- **CSS Loader** - Loading animations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/emrealtnts0/goit-js-hw-11.git
cd goit-js-hw-11
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Pixabay API key:
```env
VITE_PIXABAY_API_KEY=your_pixabay_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔑 API Configuration

This application uses the Pixabay API. To get your API key:

1. Visit [Pixabay](https://pixabay.com/api/docs/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### Required API Parameters
- `key` - Your unique API access key
- `q` - Search query (user input)
- `image_type` - Set to "photo" for photos only
- `orientation` - Set to "horizontal"
- `safesearch` - Set to "true" for age filtering

## 🎯 Features Overview

### Search Functionality
- Real-time search with Pixabay API
- Search history with dropdown suggestions
- Quick category buttons for popular searches
- Advanced filtering options

### Image Gallery
- Responsive grid layout
- Image cards with metadata (likes, views, comments, downloads)
- Lazy loading for better performance
- Infinite scroll for seamless browsing

### User Experience
- Dark/Light theme toggle
- Smooth animations and transitions
- Keyboard shortcuts for power users
- Mobile-responsive design
- Accessibility features

### Image Interaction
- Click to view full-size images in modal
- Add/remove images to favorites
- Dedicated favorites gallery
- Image metadata display

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Theme System

The app features a sophisticated theme system with:
- Light theme (default)
- Dark theme
- Smooth transitions between themes
- Persistent theme preference

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search input
- `Escape` - Close search history dropdown
- `Enter` - Submit search form

## 💾 Local Storage

The app saves user preferences locally:
- Theme selection
- Search history (last 10 searches)
- Favorite images

## 🚀 Build and Deploy

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
goit-js-hw-11/
├── src/
│   ├── main.js          # Main application logic
│   └── style.css        # Styles and theme variables
├── index.html           # HTML structure
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── .env                 # Environment variables
└── README.md           # This file
```

## 🔧 Configuration Files

### Vite Configuration
The `vite.config.js` file includes:
- Global object polyfill for SimpleLightbox compatibility
- Optimized build settings

### Environment Variables
Create a `.env` file with:
```env
VITE_PIXABAY_API_KEY=your_api_key_here
```

## 🎯 Mentor Checklist

### ✅ Core Requirements
- [x] Project built with Vite
- [x] Console free of errors, warnings, and logs
- [x] iziToast, SimpleLightbox, and css-loader libraries added
- [x] Page elements styled according to mockup
- [x] Search form for image search by keyword
- [x] Loading indicator appears before HTTP request
- [x] Previous search results cleared before new search
- [x] HTTP request sent with required parameters
- [x] Loading indicator disappears after response
- [x] Images created from backend data or "no results" message shown
- [x] New images added to DOM in single operation
- [x] SimpleLightbox refresh() method called after adding images
- [x] Modal opens with enlarged image on click
- [x] Error handling with then() and catch() methods

### ✅ Enhanced Features
- [x] Dark/Light theme toggle
- [x] Search history functionality
- [x] Advanced filtering options
- [x] Quick category buttons
- [x] Favorites system
- [x] Infinite scroll
- [x] Responsive design
- [x] Keyboard shortcuts
- [x] Local storage persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the GOIT JavaScript course.

## 👨‍💻 Author

**Emre Altuntas**
- GitHub: [@emrealtnts0](https://github.com/emrealtnts0)

---

**Note**: This project is part of the GOIT JavaScript course homework assignment. It demonstrates modern web development practices and advanced JavaScript features. 