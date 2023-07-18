import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "../contexts/useForm";

const Login = ({ loginUser }) => {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(values)
  };

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <form
        onSubmit={handleSubmit}
        className="login__form"
      >
        <input
          id="email"
          name="email"
          type="email"
          className="login__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        ></input>
        <input
          id="password"
          name="password"
          type="password"
          className="login__input"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <button
          to="/sign-up"
          type="submit"
          className="login__button"
        >
          Войти
        </button>
      </form>
      <div className="login__signin">
        <p>Ещё не зарегистрированы?</p>
        <Link
          to="/sign-up"
          className="login__link"
        >
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;