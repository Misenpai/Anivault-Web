

# Anivault

A modern React TypeScript application for tracking and discovering anime. Built with the Jikan API (MyAnimeList unofficial API) and featuring a personal anime library management system.

## 🌟 Features

### 🏠 Home Features

* *   **Current Season**: Browse anime currently airing
* *   **Last Season**: Explore anime from the previous season
* *   **Next Season**: Preview upcoming anime releases
* *   **Archive**: Access anime from any season and year with an intuitive season browser

### 📚 Library Management

Track your anime progress with four status categories:

* *   **Watching**: Currently watching anime with episode progress tracking
* *   **Completed**: Finished anime series
* *   **Plan to Watch**: Anime you plan to watch later
* *   **Dropped**: Anime you've stopped watching

### 🎯 Core Functionality

* *   **Episode Progress Tracking**: Update watched episodes with one-click increment
* *   **Status Management**: Easily move anime between different status categories
* *   **Detailed Anime Information**: View comprehensive anime details including type, season, and year
* *   **User Authentication**: Secure login and signup system
* *   **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

* *   **Frontend**: React 18 with TypeScript
* *   **Routing**: React Router
* *   **Animations**: Framer Motion
* *   **Icons**: React Icons (Feather Icons)
* *   **API**: Jikan API v4 (MyAnimeList)
* *   **HTTP Client**: Axios
* *   **Styling**: CSS Modules

## 📋 Prerequisites

* *   Node.js (v16 or higher)
* *   npm or yarn
* *   Backend API server (for user authentication and library management)

## 🚀 Installation

1. 1.  **Clone the repository**
1.     
1.     ```bash
1.     git clone <repository-url>
1.     cd anime-tracker
1.     ```
1.     
1. 2.  **Install dependencies**
1.     
1.     ```bash
1.     npm install
1.     # or
1.     yarn install
1.     ```
1.     
1. 3.  **Configure environment**
1.     
1.     Create configuration files in `src/config/`:
1.     
1.     **`src/config/config.ts`**
1.     
1.     ```typescript
1.     export default {
1.       apiBaseUrl: 'http://localhost:3001/api' // Your backend API URL
1.     };
1.     ```
1.     
1.     **`src/config/configjikan.ts`**
1.     
1.     ```typescript
1.     const JIKAN_API_BASE_URL = {
1.       API_URL: 'https://api.jikan.moe/v4'
1.     };
1.     export default JIKAN_API_BASE_URL;
1.     ```
1.     
1. 4.  **Start the development server**
1.     
1.     ```bash
1.     npm start
1.     # or
1.     yarn start
1.     ```
1.     

The application will open at `http://localhost:3000`


## 🔧 API Integration

### Jikan API (MyAnimeList)

The application uses the Jikan API v4 for anime data:

* *   Season-based anime browsing
* *   Detailed anime information
* *   Built-in rate limiting and caching
* *   Archive access to historical seasons

### Backend API

Required endpoints for user management:

* *   `POST /user/login` - User authentication
* *   `POST /user/signup` - User registration
* *   `GET /user/anime/status/:userId/:status` - Fetch user's anime by status
* *   `POST /user/anime/status` - Add anime to user's library
* *   `PUT /user/anime/status` - Update anime progress/status
* *   `DELETE /user/anime/status/:userId/:malId` - Remove anime from library

## 📱 Usage

### Getting Started

1. 1.  Sign up for a new account or log in
1. 2.  Browse current, previous, or upcoming seasons
1. 3.  Click on any anime to view details
1. 4.  Add anime to your library with appropriate status

### Managing Your Library

* *   **Add to Library**: Set initial status and episode count
* *   **Update Progress**: Use the + button to increment watched episodes
* *   **Change Status**: Episodes automatically move anime to "Completed" when finished
* *   **Remove Anime**: Use the trash button to remove from your library

### Season Navigation

* *   **Current Season**: View what's currently airing
* *   **Archive**: Browse any season from any year
* *   **Pagination**: Navigate through multiple pages of results

## 🎨 Features in Detail

### Smart Episode Tracking

* *   One-click episode increment
* *   Automatic status changes (Watching → Completed)
* *   Progress bars showing completion percentage

### Responsive Design

* *   Mobile-friendly interface
* *   Touch-optimized interactions
* *   Adaptive layouts for different screen sizes

### Performance Optimizations

* *   API response caching with 5-minute timeout
* *   Rate limiting compliance with Jikan API
* *   Efficient state management
* *   Loading states and error handling

## 🤝 Contributing

1. 1.  Fork the repository
1. 2.  Create a feature branch (`git checkout -b feature/AmazingFeature`)
1. 3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
1. 4.  Push to the branch (`git push origin feature/AmazingFeature`)
1. 5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

* *   [Jikan API](https://jikan.moe/) - Unofficial MyAnimeList API
* *   [MyAnimeList](https://myanimelist.net/) - Anime database
* *   [React](https://reactjs.org/) - Frontend framework
* *   [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

If you encounter any issues or have questions:

1. 1.  Check the existing issues on GitHub
1. 2.  Create a new issue with detailed information
1. 3.  Provide steps to reproduce any bugs

* * *

**Built with ❤️ for anime enthusiasts**
