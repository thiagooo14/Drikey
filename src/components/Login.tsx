import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '../types';

const Login = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev: LoginCredentials) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(credentials);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erro no login');
      }
    } catch {
      setError('Erro inesperado durante o login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <p>Faça Login para entrar</p>
      </div>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
          <label htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={credentials.email}
            onChange={handleInputChange}
            required
            placeholder='Digite seu email'
            disabled={isLoading}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>
            Senha
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={credentials.password}
            onChange={handleInputChange}
            required
            placeholder='Digite sua senha'
            disabled={isLoading}
          />
        </div>

        <button type='submit' className='btn-login' disabled={isLoading}>
          {isLoading ? (
            <>
              <div className='spinner-small'></div>
              Entrando...
            </>
          ) : (
            <>
              <i className='sign-in-alt'></i>
              Entrar
            </>
          )}
        </button>

        {error && <div className='error-message'>{error}</div>}
      </form>
    </>
  );
};

export default Login;
