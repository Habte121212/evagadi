import React, { useRef } from 'react'
import './register.css'
import axios from '../../AxiosConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()

  const userNameDom = useRef()
  const firstNameDom = useRef()
  const lastNameDom = useRef()
  const emailNameDom = useRef()
  const passwordNameDom = useRef()
  const passwordAgain = useRef()

  async function handleSubmit(e) {
    e.preventDefault()

    const username = userNameDom.current.value
    const firstname = firstNameDom.current.value
    const lastname = lastNameDom.current.value
    const email = emailNameDom.current.value
    const password = passwordNameDom.current.value
    const confirmPassword = passwordAgain.current.value

    // Validate password length
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    // Validate if passwords match
    if (confirmPassword !== password) {
      toast.error('Passwords do not match')
      return
    }

    // Check if all fields are filled
    if (!username || !firstname || !lastname || !email || !password) {
      toast.warn('Please provide all required information')
      return
    }

    try {
      // Send the registration data to the backend
      await axios.post('/users/register', {
        username,
        firstname,
        lastname,
        email,
        password,
        confirmPassword, // Send confirmPassword to backend
      })

      toast.success('Registration successful. Please log in.')
      navigate('/login')
    } catch (error) {
      // Handle error response from backend
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.msg || 'Registration failed. Please try again.',
        )
      } else {
        toast.error('Registration failed. Please try again.')
      }
      console.error(error)
    }
  }

  return (
    <section>
      <div className="register">
        <div className="registerWrapper">
          <div className="registerRight">
            <span className="registerimg">
              <img src="/registerImg.png" alt="logoimg" />
            </span>
            <span className="registerdsc">
              This community is a full-stack Q&A platform for developers to
              share their knowledge.
            </span>
          </div>
          <div className="registerLeft">
            <form className="registerBox" onSubmit={handleSubmit}>
              <input
                ref={userNameDom}
                type="text"
                placeholder="Username"
                required
                className="registerInput"
              />
              <input
                ref={firstNameDom}
                type="text"
                placeholder="First Name"
                required
                className="registerInput"
              />
              <input
                ref={lastNameDom}
                type="text"
                placeholder="Last Name"
                required
                className="registerInput"
              />
              <input
                ref={emailNameDom}
                type="email"
                placeholder="Email"
                required
                className="registerInput"
              />
              <input
                ref={passwordNameDom}
                type="password"
                placeholder="Password"
                required
                className="registerInput"
              />
              <input
                ref={passwordAgain}
                type="password"
                placeholder="Confirm Password"
                required
                className="registerInput"
              />
              <button className="registerButton" type="submit">
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="registerRegisterButton"
              >
                Log into Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
