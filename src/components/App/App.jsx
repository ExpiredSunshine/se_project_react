import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, postItem, deleteItem } from "../../utils/api.js";

import { signUp, signIn, getCurrentUser } from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const handleRegister = ({ name, avatar, email, password }) => {
    return signUp({ name, avatar, email, password })
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

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => {
        const filteredData = filterWeatherData(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
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
          />
          <LoginModal
            isOpen={showLogin}
            handleCloseClick={closeLogin}
            onLogin={handleLogin}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
