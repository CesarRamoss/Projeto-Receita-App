import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import chef from '../images/chef.png';
import '../css/Login.css';
import 'animate.css';

const CHARACTER_MIN = 6;

const Login = () => {
  const history = useHistory();

  const [button, setbutton] = useState(true);
  const [verifyEmail, setverifyEmail] = useState(false);
  const [verifyPass, setverifyPass] = useState(false);
  const [inputEmail, setinputEmail] = useState({ email: '' });

  const validateButton = () => (
    verifyEmail && verifyPass ? setbutton(false) : setbutton(true));

  const validateInput = ({ target }) => {
    if (target.type === 'email') {
      setinputEmail({ email: target.value });
      const re = /\S+@\S+\.\S+/;
      const email = re.test(target.value);
      validateButton();
      return email ? setverifyEmail(true) : setverifyEmail(false);
    }
    const pass = target.value.length >= CHARACTER_MIN;
    validateButton();
    return pass ? setverifyPass(true) : setverifyPass(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(inputEmail));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/foods');
  };

  return (
    <div className="main">
      <img
        src={ chef }
        alt="chef"
        className="img_chef animate__animated animate__flipInX"
      />
      <h2 className="text_title animate__animated animate__zoomIn">Master Chef</h2>
      <form onSubmit={ handleClick } className="form_login">
        <input
          type="email"
          onChange={ validateInput }
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={ validateInput }
          placeholder="Password"
          minLength={ CHARACTER_MIN + 1 }
          required
        />
        <button
          type="submit"
          disabled={ button }
        >
          Entrar

        </button>
      </form>
    </div>
  );
};

export default Login;
