# Weather Dashboard

Welcome to the Weather Dashboard documentation. This platform allows users to search for the current weather and a 5-day forecast for any city. Additionally, users can manage their favorite cities using a JSON server.

## Overview

The Weather Dashboard utilizes Node.js and Express.js as the backend framework, MongoDB as the non-relational database, and React.js for the frontend. It also incorporates the OpenWeatherMap API for fetching weather data.

## Core Functionalities

### 📝 Weather Search and Display

- Users can search for a city to get the current weather and a 5-day forecast.
- The weather data is displayed using a weather display component.

### ⭐ Favorite Cities Management

- Users can add cities to a list of favorites and remove them as needed.
- The favorite cities are stored using a JSON server.
- The platform implements CRUD operations for managing favorite cities.

## Routes

### Weather Routes (/weather)

- **GET/:** weather/:location: Fetch current weather and 5-day forecast for the specified location.

### Favorite Cities Routes (/favorites)

- **GET/favorites:** favorites: Retrieve the list of favorite cities.
- **POST/favorites:** Add a city to the list of favorites.
- **PUT/favorites/:id:** Update any city from the list of favorites.
- **DELETE/favorites/:id:** Remove a city from the list of favorites.

  
### API Documentation

For detailed API documentation, visit the Postman documentation:

[Weather Dashboard API Documentation](https://documenter.getpostman.com/view/27916984/2sA3XTg14D)

## Getting Started

To set up the Student Internship Platform locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Ankitverma1229/Weather-app.git
```

2. Install dependencies:

```
npm install
```

3. Add .env file with your details in backend

```
PORT = ****
DATABASE_URL = mongodb+srv:**\***
```

4. Add .env file with your details in frontend

```
REACT_APP_BACKEND_BASE_URL = **\*\*\***
```

4. Start the application for backend:

```
npm run dev || nodemon server.js
```

5. Start the application for frontend:

```
npm run start
```

## Technology Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ORM Tool:** Mongoose
- **Frontend :** React.js, Tailwind CSS
- **Weather API:** OpenWeatherMap API

## Contact

For inquiries and support, please reach out to [ankitkumar040722@gmail.com](mailto:ankitkumar040722@gmail.com).
