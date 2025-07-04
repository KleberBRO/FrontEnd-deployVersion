const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
async login(email, password) {
    try {
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
        let errorMessage = 'Erro no servidor';
        let errorType = 'server';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Erro ao fazer login';
          
          // Definir tipo de erro baseado no status
          if (response.status === 401) {
            errorType = 'auth';
          } else if (response.status === 400) {
            errorType = 'validation';
          } else if (response.status >= 500) {
            errorType = 'server';
          }
        } catch (error) {
          if (response.status === 401) {
            errorMessage = 'Usuário ou senha inválidos';
            errorType = 'auth';
          }
          else if (response.status === 400) {
            errorMessage = 'Dados inválidos';
            errorType = 'validation';
          }
          else if (response.status === 500) {
            errorMessage = 'Erro interno do servidor';
            errorType = 'server';
          }
        }
        
        const customError = new Error(errorMessage);
        customError.type = errorType;
        customError.status = response.status;
        throw customError;
      }

      const data = await response.json();
      
      // Salvar dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('email', data.email);
      
      return data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
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