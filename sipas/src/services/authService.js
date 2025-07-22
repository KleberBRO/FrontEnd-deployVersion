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
    console.error('Erro ao decodificar token:', error);
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
        // ...existing error handling...
        let errorMessage = 'Erro no servidor';
        let errorType = 'server';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Erro ao fazer login';
          
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
      
      // Salvar token e email
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      // Decodificar token e extrair role
      const decodedToken = decodeJWT(data.token);
      
      if (decodedToken) {
        // Salvar expiração
        if (decodedToken.exp) {
          const expirationTime = new Date(decodedToken.exp * 1000);
          localStorage.setItem('tokenExpiration', expirationTime);
        }
        
        // Extrair e salvar role
        if (decodedToken.roles && decodedToken.roles.length > 0) {
          const role = decodedToken.roles[0].replace('ROLE_', '');
          localStorage.setItem('userRole', role);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async fetchUserRole(token) {
    const decodedToken = decodeJWT(token);

    if (decodedToken && decodedToken.roles && decodedToken.roles.length > 0) {
      const role = decodedToken.roles[0].replace('ROLE_', '');
      localStorage.setItem('userRole', role);
      return role;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/v1/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const users = await response.json();
        const decodedTokenForUserId = decodeJWT(token);
        if (decodedTokenForUserId && decodedTokenForUserId.userId) {
          const currentUser = users.find(user => user.id === decodedTokenForUserId.userId);
          if (currentUser) {
            localStorage.setItem('userRole', currentUser.role);
            return currentUser.role;
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar role do usuário:', error);
    }
    
    return null;
  },

  getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    // Tentar extrair dados do token primeiro
    const decodedToken = decodeJWT(token);
    
    let role = localStorage.getItem('userRole');
    
    // Se não temos role no localStorage, tentar extrair do token
    if (!role && decodedToken && decodedToken.roles && decodedToken.roles.length > 0) {
      role = decodedToken.roles[0].replace('ROLE_', '');
      localStorage.setItem('userRole', role);
    }
    
    // Se ainda não temos role, buscar do backend
    if (!role) {
      this.fetchUserRole(token).then(fetchedRole => {
        if (fetchedRole) {
          role = fetchedRole;
        }
      });
    }

    if (decodedToken) {
      const email = localStorage.getItem('email');
      
      return {
        id: decodedToken.userId,
        name: decodedToken.name,
        email: email,
        role: role,
        token: token
      };
    }

    // Fallback para localStorage
    const email = localStorage.getItem('email');

    if (!email || email === 'undefined') {
      return null;
    }

    return {
      email: email,
      role: role,
      token: token
    };
  },

  // ...existing code...
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    localStorage.removeItem('tokenExpiration');
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