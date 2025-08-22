export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

export interface DashboardData {
  id: number;
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'order' | 'payment' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
  error?: string;
}

export interface DashboardResponse {
  success: boolean;
  data?: {
    stats: DashboardData[];
    activities: RecentActivity[];
  };
  error?: string;
}

export interface AuthContextType {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => void;
}
