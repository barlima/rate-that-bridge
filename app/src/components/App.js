import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ROLL_DOWN = "roll-down";
const ROLL_UP = "roll-up";
const FADE_ID = "fade-in";
const FADE_OUT = "fade-out";
const SQUEEZED = "squeezed";
const RELEASED = "released";

const App = () => {
  const [expandedClass, setExpandedClass] = useState('');
  const [fadeClass, setFadeClass] = useState('');
  const [squeezeClass, setSqueezeClass] = useState('');

  const toggleExpendedClass = () => {
    if (expandedClass === ROLL_DOWN) {
      setExpandedClass(ROLL_UP);
      setFadeClass(FADE_OUT);
      setSqueezeClass(RELEASED);
    } else {
      setExpandedClass(ROLL_DOWN);
      setFadeClass(FADE_ID);
      setSqueezeClass(SQUEEZED);
    }
  }


  return (
    <div className="landing-page">
      <div className="landing-page__background">
        <div className="landing-page__panel">
          <div className="landing-page__options">
            <div className="landing-page__option">
              <div className="landing-page__option-label" onClick={toggleExpendedClass}>
                Start
              </div>
              <div className={`landing-page__option-expand ${expandedClass}`}>
                <div
                  href="http://localhost:4000/auth/google" 
                  className={`google-login landing-page__option-button ${fadeClass}`}
                >
                  Sign in with Google
                </div>
              </div>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <div className="landing-page__option-label">
                Browse
              </div>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <div className="landing-page__option-label">
                About
              </div>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <div className="landing-page__option-label">
                Contribute
              </div>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <div className="landing-page__option-label">
                Related
              </div>
            </div>
          </div>
        </div>
        <span className="landing-page__background-author">
          Photo by Tanner Daniels on Unsplash
        </span>
      </div>
    </div>
  );
}

export default App;
