import { API_BASE_URL } from '../config/api.js';

// Função para decodificar JWT
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Erro ao decodificar o token JWT');
    return null;
  }
};

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
      
      // Decodificar o token para extrair informações do usuário
      const tokenPayload = decodeJWT(data.token);
      const userRoles = tokenPayload?.roles; // Aqui você extrai o role
      
      // Salvar dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', tokenPayload?.sub || email); // 'sub' geralmente é o email/username
      localStorage.setItem('userRoles', JSON.stringify(userRoles)); // Salvar os roles do usuário

      // Fazer uma segunda requisição para buscar o role do usuário
      await this.fetchUserRole(data.token);
      
      return data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async fetchUserRole(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userRole', userData.role);
      }
    } catch (error) {
      console.error('Erro ao buscar role do usuário:', error);
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
  },

  getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const email = localStorage.getItem('email');
    const roles = JSON.parse(localStorage.getItem('userRoles'));

    // Verificar se os valores não são 'undefined' como string
    if (!email || email === 'undefined' || !roles || roles === 'undefined') {
      return null;
    }

    return {
      email: email,
      roles: roles,
      token: token
    };
  }
};