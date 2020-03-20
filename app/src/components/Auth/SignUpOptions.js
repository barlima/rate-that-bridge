import React from 'react';
import { Link } from 'react-router-dom';

const SignUpOptions = ({ fadeClass, expandedClass }) => {
  return (
    <div className={`landing-page__option-expand ${expandedClass}`}>
      <div className={`landing-page__option-sign-in ${fadeClass}`}>
        <div  className={`landing-page__option-auth`}>
          <Link to="/signin" className="landing-page__option-button">
            <button className="primary-button button-wide">
              Login
            </button>
          </Link>

          <Link to="/signup" className="landing-page__option-button">
            <button className="secondary-button button-wide">
              Sign Up
            </button>
          </Link>
        </div>

        <span className="landing-page__option-sign-in-or">or</span>

        <a
          href={process.env.REACT_APP_API_AUTH} 
          className={`google-login landing-page__option-button`}
        >
          Sign in with Google
        </a>
      </div>
    </div>
  )
}

export default SignUpOptions;