import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import withUser from './withUser';
import SignUpOptions from './Auth/SignUpOptions';

const ROLL_DOWN = "roll-down";
const ROLL_UP = "roll-up";
const FADE_ID = "fade-in";
const FADE_OUT = "fade-out";
const SQUEEZED = "squeezed";
const RELEASED = "released";

const App = ({ history, user: currentUser }) => {
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

  const handleStartClick = () => {
    if (!currentUser.id) {
      return toggleExpendedClass();
    }

    history.push('/vote');
  }

  return (
    <div className="landing-page">
      <div className="landing-page__background">
        <div className="landing-page__panel">
          <div className="landing-page__options">
            <div className="landing-page__option">
              <div className="landing-page__option-label" onClick={handleStartClick}>
                Start
              </div>
              {
                !currentUser.id && (
                  <SignUpOptions expandedClass={expandedClass} fadeClass={fadeClass} />
                )
              }
              
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <Link to="/bridges">
                <div className="landing-page__option-label">
                  Browse
                </div>
              </Link>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <Link to="/about">
                <div className="landing-page__option-label">
                  About
                </div>
              </Link>
            </div>
            <div className={`landing-page__option ${squeezeClass}`}>
              <Link to="/contribute">
                <div className="landing-page__option-label">
                  Contribute
                </div>
              </Link>
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

export default withRouter(withUser(App));
