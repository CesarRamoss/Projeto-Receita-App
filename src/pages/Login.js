import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import chef from '../images/chef.png';
import '../css/Login.css';

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
    history.push('/foods');
  };

  return (
    <div className="main">
      <img src={ chef } alt="chef" className="img_chef" />
      <h2 className="text_title">Master Chef</h2>
      <form onSubmit={ handleClick } className="form_login">
        <input
          type="email"
          data-testid="email-input"
          onChange={ validateInput }
          placeholder="Email"
          required
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ validateInput }
          placeholder="Password"
          minLength={ CHARACTER_MIN }
          required
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ button }
        >
          Entrar

        </button>
      </form>
    </div>
  );
};

export default Login;
