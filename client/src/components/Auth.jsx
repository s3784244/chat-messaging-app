import React, { useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';

import signInImage from '../assets/signup.jpg'

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState)
  const [isSignUp, setIsSignUp] = useState(true);

  // This function will handle the data from all the inputs. Handle
  // states of these fields and send them over to the backend or login the user.
  // We get an event with text of the input we are changing and we want to call setForm
  const handleChange = (e) => {
    // Form is not just one input, it is an object, so we all the other items on the form, because we are only changing one
    setForm({...form, [e.target.name]: e.target.value})
  }

  // This function will pass form data back to the backend
  const handleSubmit = (e) => {
    // to prevent it from submitting onClick and reloading page
    e.preventDefault();

    const { fullName, username, password, phoneNumber, avatarURL } = form;

    // Specify the URL we will be making the request to
    const URL = 'http://localhost:5000';
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
            <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='fullName'>Full Name</label>
                  <input 
                    name="fullName"
                    type="text"
                    placeholder='Full Name'
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='username'>Username</label>
                <input 
                  name="username"
                  type="text"
                  placeholder='Username'
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignUp && (
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='phoneNumber'>Phone Number</label>
                  <input 
                    name="phoneNumber"
                    type="text"
                    placeholder='Phone Number'
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {isSignUp && (
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='avatarURL'>Avatar URL</label>
                  <input 
                    name="avatarURL"
                    type="text"
                    placeholder='Avatar URL'
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='password'>Password</label>
                <input 
                  name="password"
                  type="password"
                  placeholder='Password'
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignUp && (
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input 
                    name="confirmPassword"
                    type="password"
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className='auth__form-container_fields-content_button'>
                <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
              </div>
            </form>
            <div className='auth__form-container_fields-account'>
                <p>
                  {isSignUp
                  ? "Already have an account?" 
                  : "Don't have an account?"
                  }
                  <span onClick={switchMode}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </span>
                </p>
            </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
          <img src={signInImage} alt="Sign In"/>
      </div>
    </div>
  )
}

export default Auth
