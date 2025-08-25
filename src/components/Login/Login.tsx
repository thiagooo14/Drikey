import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '../../types';
import './Login.scss';

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
    <div className='login'>
      <div className='login__header'>
        <p className='login__header--text'>Faça Login para entrar</p>
      </div>
      <form onSubmit={handleSubmit} className='login__form'>
        <div className='login__form-group'>
          <label htmlFor='email' className='login__form-label'>
            Email
          </label>
          <input
            className='login__form-input'
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

        <div className='login__form-group'>
          <label htmlFor='password' className='login__form-label'>
            Senha
          </label>
          <input
            className='login__form-input'
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

        <div className='login__btn-wrapper'>
          <button type='submit' className='login__btn' disabled={isLoading}>
            {isLoading ? (
              <>
                <div className='login__btn-spinner'></div>
                Entrando...
              </>
            ) : (
              <>
                <i className='login__btn-signIn'></i>
                Entrar
              </>
            )}
          </button>
        </div>

        {error && <div className='login__error-message'>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
