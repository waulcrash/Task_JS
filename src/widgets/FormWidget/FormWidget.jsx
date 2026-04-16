import React, { useState } from 'react'
import './FormWidget.css'

export const FormWidget = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    checks: {
      length: false,
      digit: false,
      special: false,
      uppercase: false
    }
  })

  const checkPasswordStrength = (pass) => {
    const checks = {
      length: pass.length >= 8,
      digit: /\d/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      uppercase: /[A-Z]/.test(pass)
    }
    
    const score = Object.values(checks).filter(Boolean).length
    
    let message = ''
    if (score === 0) message = 'Очень слабый'
    else if (score === 1) message = 'Слабый'
    else if (score === 2) message = 'Средний'
    else if (score === 3) message = 'Хороший'
    else if (score === 4) message = 'Отличный!'
    
    let color = ''
    if (score <= 1) color = '#ef4444'
    else if (score === 2) color = '#f59e0b'
    else if (score === 3) color = '#10b981'
    else color = '#22c55e'
    
    setPasswordStrength({
      score,
      message,
      checks,
      color
    })
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login && password && passwordStrength.score >= 3) {
      alert(`Добро пожаловать, ${login}!`)
    } else if (passwordStrength.score < 3) {
      alert('Пароль слишком слабый. Придумайте более надежный пароль.')
    } else {
      alert('Введите логин и пароль')
    }
  }

  return (
    <div className="form-widget">
      <h1>2. Форма проверки пароля</h1>
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="login" className="form__label">Логин</label>
          <input
            type="text"
            id="login"
            className="form__input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Введите ваш логин"
          />
        </div>
        
        <div className="form__group">
          <label htmlFor="password" className="form__label">Пароль</label>
          <input
            type="password"
            id="password"
            className="form__input"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Введите пароль"
          />
        </div>
        
        {password && (
          <div className="form__strength">
            <div className="form__strength-bar">
              <div 
                className="form__strength-fill"
                style={{
                  width: `${(passwordStrength.score / 4) * 100}%`,
                  backgroundColor: passwordStrength.color
                }}
              ></div>
            </div>
            <p className="form__strength-message" style={{ color: passwordStrength.color }}>
              {passwordStrength.message}
            </p>
            
            <ul className="form__checks">
              <li className={passwordStrength.checks.length ? 'checked' : ''}>
                {passwordStrength.checks.length ? '✓' : '○'} Минимум 8 символов
              </li>
              <li className={passwordStrength.checks.digit ? 'checked' : ''}>
                {passwordStrength.checks.digit ? '✓' : '○'} Содержит цифру
              </li>
              <li className={passwordStrength.checks.special ? 'checked' : ''}>
                {passwordStrength.checks.special ? '✓' : '○'} Содержит спецсимвол
              </li>
              <li className={passwordStrength.checks.uppercase ? 'checked' : ''}>
                {passwordStrength.checks.uppercase ? '✓' : '○'} Содержит заглавную букву
              </li>
            </ul>
          </div>
        )}
        
        <button type="submit" className="form__submit">
          Войти
        </button>
      </form>
    </div>
  )
}