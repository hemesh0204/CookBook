# 🍽️ [Cookbook App](https://c00kb00k.netlify.app/)

A React-based recipe generator that fetches personalized recipes using **GroqCloud API**. Users can search for recipes, generate new meal ideas, and store their preferences for a tailored experience.

---

## 🚀 Features

- **🔍 Recipe Search:** Enter a dish name to find detailed recipes.
- **✨ AI-Generated Ideas:** Click "Generate Ideas" to get AI-powered meal suggestions.
- **📖 Full Recipe Details:** View ingredients, instructions, and nutrition info upon selection.
- **⚙️ Preference-Based Results:** Customize results based on cuisine, nutrition goals, and allergies.
- **🕒 Recipe History:** Access past searches and generated recipes via Firebase storage.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router
- **Backend & Storage:** Firebase
- **API Integration:** GroqCloud API
- **State Management:** React Hooks

---

## Project Structure

```
📂 cookbook-app
│── 📜 README.md
│── 📜 eslint.config.js
│── 📜 index.html
│── 📜 netlify.toml
│── 📜 package-lock.json
│── 📜 package.json
│── 📂 public
│   └── vite.svg
│── 📂 src
│   ├── App.jsx
│   ├── 📂 components
│   │   ├── GenerateIdeas.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── PreferencesPage.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── RecipeDisplay.jsx
│   │   ├── RecipePage.jsx
│   │   └── SearchPage.jsx
│   ├── 📂 firebase
│   │   └── firebaseConfig.js
│   ├── main.jsx
│   ├── 📂 styles
│   │   └── global.css
│── 📜 vite.config.js
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

