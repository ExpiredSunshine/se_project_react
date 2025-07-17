import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Utils & API -----
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  postItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signUp, signIn, getCurrentUser } from "../../utils/auth.js";

// UI Components -----
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

// Contexts -----
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function App() {
  // State: Data & UI -----
  const [weatherData, setWeatherData] = useState({
    city: "",
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // State: Authentication -----
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // State: Modals -----
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // UI Handlers -----
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);
    request
      .then((response) => {
        const updatedItem = response.data;
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedItem : item))
        );
      })
      .catch(console.error);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  // Data Handlers: Items -----
  const handleAddItemModalSubmit = (data) => {
    return postItem({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    });
  };

  const handleItemDelete = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== card._id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Modal Toggles -----
  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const openEditProfile = () => setShowEditProfile(true);

  // Authentication Logic -----
  const handleRegister = ({ name, avatar, email, password }) => {
    const payload = { name, email, password };
    if (avatar && avatar.trim() !== "") {
      payload.avatar = avatar.trim();
    }
    return signUp(payload)
      .then(() => signIn({ email, password }))
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        return token;
      })
      .then((token) => getCurrentUser(token))
      .then((user) => {
        setCurrentUser(user);
        closeRegister();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return signIn({ email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        return token;
      })
      .then((token) => getCurrentUser(token))
      .then((user) => {
        setCurrentUser(user);
        closeLogin();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleProfileUpdate = ({ name, avatar }) =>
    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setShowEditProfile(false);
      })
      .catch(console.error);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Effects: Initial Data Fetch -----
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => filterWeatherData(res))
      .then(setWeatherData)
      .catch(console.error);
  }, []);

  // Effects: Fetch & Sort Cards -----
  useEffect(() => {
    getItems()
      .then(({ data }) => {
        const userItems = data
          .filter((item) => !!item.owner)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const defaultItems = data.filter((item) => !item.owner);

        setClothingItems([...userItems, ...defaultItems]);
      })
      .catch(console.error);
  }, []);

  // Effect: Rehydrate Authentication -----
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthChecked(true);
      return;
    }
    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => localStorage.removeItem("jwt"))
      .finally(() => setIsAuthChecked(true));
  }, []);

  // Rendering -----
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              onRegisterClick={openRegister}
              onLoginClick={openLogin}
              onSignOutClick={handleSignOut}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthChecked={isAuthChecked}
                  >
                    <Profile
                      isLoggedIn={isLoggedIn}
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onSignOutClick={handleSignOut}
                      onEditProfileClick={openEditProfile}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleCloseClick={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            onDelete={handleItemDelete}
          />
          <RegisterModal
            isOpen={showRegister}
            handleCloseClick={closeRegister}
            onRegister={handleRegister}
            onSwitchToLogin={openLogin}
          />
          <LoginModal
            isOpen={showLogin}
            handleCloseClick={closeLogin}
            onLogin={handleLogin}
            onSwitchToRegister={openRegister}
          />
          <EditProfileModal
            isOpen={showEditProfile}
            handleCloseClick={() => setShowEditProfile(false)}
            currentUser={currentUser}
            onSubmit={handleProfileUpdate}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
