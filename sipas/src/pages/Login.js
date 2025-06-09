import React from 'react';
import '../styles/Login.css';
import Header from '../components/Header';

function App() {
  return (
    <>
      <Header/>
      <div className="login-background">
        <form className="login-form">
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Entrar</button>
          <p className='error-message'>
            *Email ou senha inválidos
          </p>
        </form>
      </div>
    </>
  );
}

export default App;
