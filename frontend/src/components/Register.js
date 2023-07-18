import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "../contexts/useForm";

const Register = ({ registerUser }) => {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(values)
  };

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          className="register__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        ></input>
        <input
          id="password"
          name="password"
          type="password"
          className="register__input"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
        ></input>
        <button
          to="/sign-in"
          type="submit"
          className="register__button"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signup">
        <p>Уже зарегистрированы?</p>
        <Link
          to="/login"
          className="register__link"
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;