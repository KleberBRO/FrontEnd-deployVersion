const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  async login(email, password) {

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
      email,
      password 
      })
    });

    if (!response.ok) {
      throw new Error('usuario ou senha inválidos');
    }

    const data = await response.json();
    
    // Salvar dados do usuário
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('email', data.email);
    
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getUserRole() {
    return localStorage.getItem('userRole');
  }
};