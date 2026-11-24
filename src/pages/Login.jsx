import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { parseStudentNumber } from '../utils/studentNumber'
import Button from '../components/common/Button'
import pupLogo from '../assets/logo/pup-logo.png'
import './login.css'

export default function Login() {
  const { user, login } = useApp()
  const navigate = useNavigate()

  const [studentNumber, setStudentNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/" replace />

  const parsed = parseStudentNumber(studentNumber)

  const handleStudentNumberChange = (e) => {
    setStudentNumber(e.target.value)
    setErrors((prev) => ({ ...prev, studentNumber: undefined }))
  }

  const handleStudentNumberBlur = () => {
    if (studentNumber && !parsed.valid) {
      setErrors((prev) => ({ ...prev, studentNumber: parsed.error }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setErrors((prev) => ({ ...prev, password: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!parsed.valid) next.studentNumber = parsed.error
    if (!password) next.password = 'Please enter your password.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    login(parsed)
    navigate('/', { replace: true })
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <img className="login-logo" src={pupLogo} alt="PUP seal" />
        <h1 className="login-title">PUP eLMS</h1>
        <p className="login-subtitle">Log in with your student number</p>

        <label htmlFor="student-number" className="login-label">
          Student number
        </label>
        <input
          id="student-number"
          className={`field-input ${errors.studentNumber ? 'invalid' : ''}`}
          type="text"
          inputMode="text"
          autoComplete="username"
          placeholder="2023-00123-MN-0"
          value={studentNumber}
          onChange={handleStudentNumberChange}
          onBlur={handleStudentNumberBlur}
          aria-invalid={errors.studentNumber ? 'true' : 'false'}
          aria-describedby="student-number-error"
        />
        <div id="student-number-error" aria-live="polite">
          {errors.studentNumber && (
            <p className="field-error" role="alert">
              ✕ {errors.studentNumber}
            </p>
          )}
        </div>

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <div className="password-row">
          <input
            id="password"
            className={`field-input ${errors.password ? 'invalid' : ''}`}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div id="password-error">
          {errors.password && (
            <p className="field-error" role="alert">
              ✕ {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" className="login-submit">
          Log in
        </Button>

        <p className="login-demo-note">
          Prototype only: any password works as long as the student number is valid.
        </p>
      </form>
    </div>
  )
}