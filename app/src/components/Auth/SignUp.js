import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/get';
import bcrypt from 'bcryptjs';
import { gql } from 'apollo-boost';
import { validatePassword } from '../../helpers/auth';

const SING_UP = gql`
  mutation signUp($userInput: UserInput!) {
    signUp(userInput: $userInput) {
      id
    }
  }
`

const SignUp = ({ history }) => {
  const [ error, setError ] = useState();
  const [ signUp, _ ] = useMutation(SING_UP);
  const submit = async event => {
    event.preventDefault();

    const username = get(event, "target.username.value").toLowerCase().trim();
    const firstName = get(event, "target.firstname.value") || null;
    const lastName = get(event, "target.lastname.value") || null;
    const password = get(event, "target.password.value");
    const passwordConfirmation = get(event, "target.password-confirm.value");

    if (!username) {
      setError('Invalid username');
      return;
    }
    
    if (password !== passwordConfirmation ) {
      setError('Passwords don\'t match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must contain at least one letter and one number, and be at least 6 characters long');
      return;
    }
    
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.REACT_APP_SALT));

    const userInput = {
      username,
      firstName,
      lastName,
      password: hashedPassword
    }

    try {
      await signUp({ variables: { userInput } });
    } catch (error) {
      // ToDo: Handle GQL errors in API
      if (error.message.includes('GraphQL error:')) {
        return setError(error.message.split('GraphQL error: ')[1]);
      }
      return setError('Cannot sign up, please try again');
    }

    history.push('/signin');
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
        <input type="text" name="firstname" placeholder="FIRST NAME" />
        <input type="text" name="lastname" placeholder="LAST NAME" />
        <input type="text" name="username" placeholder="*USERNAME" required />
        <input type="password" name="password" placeholder="*PASSWORD" required />
        <input type="password" name="password-confirm" placeholder="*CONFIRM PASSWORD" required />
        <input type="submit" className="signup__form-submit" />

        <span className="signup__or">or</span>

        <a
          href={process.env.REACT_APP_API_AUTH} 
          className={`google-login signup__external`}
        >
          Sign in with Google
        </a>

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

export default withRouter(SignUp);