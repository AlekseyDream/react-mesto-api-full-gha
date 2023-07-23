import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/header-logo.svg";

 function Header({ userEmail, logOut }) {
  const {email} = userEmail || {};
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип сайта Mesto"
      />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__user">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={logOut}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;