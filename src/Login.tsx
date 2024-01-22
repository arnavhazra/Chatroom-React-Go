import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  // Handle the login process
  function handleLogin() {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Username or password is incorrect');
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        history.push('/chat');
      })
      .catch((error) => setErrorMessage(error.message));
  }

  return (
    <div>
      {/* Input fields for username and password */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* Login button */}
      <button onClick={handleLogin}>Login</button>
      {/* Display error message if any */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default Login;
