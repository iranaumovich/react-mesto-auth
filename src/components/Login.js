import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "./Auth.js";

function Login(props) {
  const [formValue, setFormValue] = React.useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          props.handleLogin();
          navigate("/mesto", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="entrance">
      <h2 className="entrance__header">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
