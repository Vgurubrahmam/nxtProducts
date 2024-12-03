import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import './index.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');

  useEffect(() => {
    if (jwtToken) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [jwtToken, navigate]);

  const onSubmitSuccess = (jwtToken,message) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    setIsAuthenticated(true);
    toast.success(message );
    navigate('/'); 
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
    toast.error(errorMsg  );
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    const url = 'http://localhost:8000/login';
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
        onSubmitFailure(data.message || 'Login failed');
        return;
      }
      const data = await response.json();
      onSubmitSuccess(data.token,data.message);
      console.log(data)
    } catch (error) {
console.log("server error",error)
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

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="username">
        EMAIL
      </label>
      <input
        type="email"
        id="username"
        className="username-input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Username"
        required
      />
    </>
  );

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
        <div className="input-container">{renderEmailField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div style={{width:"100%"}}>
<p style={{textAlign:"center",fontWeight:"bold"}}>OR</p>
<Link to="/signup">
  <button type="button" className="login-button" style={{margin:"0px"}}>
    Signup
  </button>
</Link>
</div>
      </form>
    </div>
  );
};

export default LoginForm;
