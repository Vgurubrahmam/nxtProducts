import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import './index.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');
useEffect(()=>{
    if(jwtToken){
        navigate("/")
    }
},[jwtToken,navigate])
  const onSubmitSuccess = (message) => {
    toast.success(message );
    navigate('/login');
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
    toast.error(errorMsg );
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password, email };
    const url = 'http://localhost:8000/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        onSubmitFailure(data.message || 'Sign up failed');
        return;
      }
      const data = await response.json();
      onSubmitSuccess(data.message);
      console.log(data.message)
    } catch (error) {
      onSubmitFailure('Something went wrong, please try again.');
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
    </>
  );

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email" // Ensured correct ID
        className="username-input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
    </>
  );

  // Redirect if jwtToken exists
//   if (jwtToken) {
//     navigate("/login");
//     return null;
//   }

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderEmailField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Signup
        </button>
        <div style={{width:"100%"}}>
        <p style={{textAlign:"center",fontWeight:"bold"}}>OR</p>

        <Link to="/login">
          <button type="button" className="login-button" style={{margin:"0px"}}>
            Login
          </button>
        </Link>
        </div>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
