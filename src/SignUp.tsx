import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  // Handle the sign-up process
  function handleSignUp() {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 201) {
          history.push('/login');
        } else {
          throw new Error('Failed to sign up');
        }
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
      {/* Sign-up button */}
      <button onClick={handleSignUp}>Sign Up</button>
      {/* Display error message if any */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default SignUp;
