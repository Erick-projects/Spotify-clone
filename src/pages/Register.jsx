import React from 'react'
import { useForm } from 'react-hook-form'
import './Register.css'

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = data => {
    alert(`Registrado con: ${data.email}`)
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify logo"
          className="register-logo"
        />
        <h2 className="register-title">Regístrate para escuchar música gratis</h2>
        <p className="register-subtitle">
          Sin anuncios, solo música.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Correo inválido',
              },
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Mínimo 6 caracteres',
              },
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Register
