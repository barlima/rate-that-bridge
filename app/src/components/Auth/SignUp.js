import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [ error, setError ] = useState();
  const submit = () => {

  }

  return (
    <div className="secondary-background signup">
      <div className="signup__back">
        <Link to="/"><span>{"<"}</span> Back</Link>
      </div>

      <div className="signup__title">
        <span>Create New Account</span>
      </div>

      <form className="signup__form" onSubmit={submit} >
        <input type="text" name="fullname" placeholder="full name" />
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <input type="text" name="password-confirm" placeholder="confirm password" />
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
  )
}

export default SignUp;