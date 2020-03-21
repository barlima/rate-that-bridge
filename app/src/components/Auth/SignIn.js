import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

const SignIn = () => {
  const [ error, setError ] = useState();
  const submit = async event => {
    event.preventDefault();

    const username = get(event, "target.username.value").toLowerCase();
    const password = get(event, "target.password.value");

    const res = await fetch(`/auth/login?username=${username}&password=${password}`, {
      method: 'POST',
    });
    
    if (!res.ok) {
      setError("Invalid name or password");
      return;
    }

    window.location.href = '/vote';
  }

  return (
    <div className="secondary-background signup">
      <div className="signup__back">
        <Link to="/"><span>{"<"}</span> Back</Link>
      </div>

      <div className="signup__login">
        <div className="signup__title">
          <span>Log In</span>
        </div>

        <form className="signup__form" onSubmit={submit} >
          <input type="text" name="username" placeholder="USERNAME" />
          <input type="password" name="password" placeholder="PASSWORD" />
          <input type="submit" className="signup__form-submit" />

          {
            error && (
              <div className="contribute__error">
                <span>{error}</span>
              </div>
            )
          }
          
        </form>
      </div>
    </div>
  )
}

export default SignIn;