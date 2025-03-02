import React from "react";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import GenerateIdeas from "./components/GenerateIdeas";
import { Routes, Route, PrefetchPageLinks } from "react-router-dom";
import RecipePage from "./components/RecipePage";
import "./styles/global.css"; 
import HistoryPage from "./components/HistoryPage";
import PreferencesPage from "./components/PreferencesPage"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchPage />
              <GenerateIdeas />
            </>
          }
        />
        <Route path="/recipe/:recipeTitle" element={<RecipePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/preference" element={<PreferencesPage />} />
      </Routes>
    </>
  );
}

export default App;
