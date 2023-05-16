import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./Auth.js";

function Register({ onSubmit }) {
  const [formValue, setFormValue] = React.useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    auth.register(email, password).then((res) => {
      console.log(res);
      if (res.type === "data") {
        onSubmit(false);
        navigate("/sign-in", { replace: true });
      } else {
        onSubmit(true);
      }
    });
  }

  return (
    <div className="entrance entrance__type_register">
      <h2 className="entrance__header">Регистрация</h2>
      <form className="form form_type_entrance" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form__item form__item_type_entrance"
          aria-describedby="email-input-error"
          id="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <span className="form__error" id="email-input-error" />
        <input
          type="password"
          className="form__item form__item_type_entrance"
          aria-describedby="password-input-error"
          id="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <span className="form__error" id="password-input-error" />
        <button
          type="submit"
          className="form__button form__button_type_entrance"
        >
          Зарегистрироваться
        </button>
      </form>

      <Link to="/sign-in" className="entrance__question">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
