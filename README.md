# [Cookbook App](url:https://c00kb00k.netlify.app/)

A modern cookbook application built using React for the frontend. The app allows users to generate recipe ideas, fetch full recipes, and navigate through different pages seamlessly.

## Features

- **Generate Recipe Ideas**: Users can click the "Generate Ideas" button to receive recipe suggestions from the Groq Playground API.
- **Full Recipe Display**: Clicking on a suggested recipe will generate the full recipe details.
- **Navigation**: The app navigates to a new page when a recipe is selected.
- **Modular Structure**: The project follows a modular structure for maintainability and scalability.

## Tech Stack

- **Frontend**: React, React Router
- **API Integration**: Groq Playground API
- **State Management**: React Hooks

## Project Structure

```
📂 cookbook-app
│── 📂 src
│   ├── 📂 components
│   │   ├── Button.js
│   │   ├── RecipeCard.js
│   │   ├── RecipeDetails.js
│   ├── 📂 pages
│   │   ├── Home.js
│   │   ├── RecipePage.js
│   ├── 📂 services
│   │   ├── api.js  # Handles API calls to Groq Playground
│   ├── 📂 utils
│   │   ├── helpers.js
│   ├── App.js
│   ├── index.js
│── 📜 package.json
│── 📜 README.md
```

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cookbook-app.git
   ```
2. Navigate into the project folder:
   ```sh
   cd cookbook-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## API Integration

The app interacts with the Groq Playground API to fetch recipe ideas. Ensure that the API integration is properly configured in the `services/api.js` file.

## Future Enhancements

- Add user authentication for personalized experiences.
- Implement a favorites feature to save recipes.
- Enhance UI/UX with animations and improved design.

## License

This project is licensed under the MIT License.

