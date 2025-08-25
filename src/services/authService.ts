import axios from 'axios';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  DashboardResponse,
  DashboardData,
  RecentActivity,
} from '../types';

const API_URL = 'http://localhost:3001';

class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  constructor() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const users: User[] = response.data;
      const user = users.find((u) => u.email === credentials.email);
      if (!user) {
        return { success: false, error: 'Credenciais inválidas' };
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Credenciais inválidas',
        };
      }

      const token = this.generateSimpleJWT(user);
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(
        this.userKey,
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch {
      return { success: false, error: 'Erro ao conectar ao servidor' };
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const users: User[] = response.data;
      const existingUser = users.find((u) => u.email === credentials.email);
      if (existingUser) {
        return {
          success: false,
          error: 'Este email já está em uso',
        };
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(
        credentials.password,
        saltRounds
      );
      const newUser: User = {
        id: Date.now(),
        name: credentials.name,
        email: credentials.email,
        password: hashedPassword,
        role: 'user',
      };

      try {
        await axios.post(`${API_URL}/users`, newUser);
      } catch (saveError) {
        console.error('Erro ao salvar usuário:', saveError);
        return {
          success: false,
          error: 'Erro ao criar conta. Tente novamente.',
        };
      }

      const token = this.generateSimpleJWT(newUser);
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(
        this.userKey,
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        })
      );

      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      };
    } catch {
      return { success: false, error: 'Erro ao conectar ao servidor' };
    }
  }

  private generateSimpleJWT(user: User): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(`signature_${user.id}_${Date.now()}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  decodeJWT(token: string): Record<string, unknown> | null {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    const payload = this.decodeJWT(token);
    return payload !== null;
  }

  getCurrentUser(): Omit<User, 'password'> | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async getDashboardData(): Promise<DashboardResponse> {
    try {
      const [statsResponse, activitiesResponse] = await Promise.all([
        axios.get(`${API_URL}/dashboard_data`),
        axios.get(`${API_URL}/recent_activities`),
      ]);

      const stats: DashboardData[] = statsResponse.data;
      const activities: RecentActivity[] = activitiesResponse.data;

      return {
        success: true,
        data: {
          stats,
          activities,
        },
      };
    } catch {
      return {
        success: false,
        error: 'Erro ao carregar dados do dashboard',
      };
    }
  }
}

export const authService = new AuthService();
