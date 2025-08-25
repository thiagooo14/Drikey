import React, { useState } from 'react';
import type { RegisterCredentials } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Register.scss'

const Register = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev: RegisterCredentials) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (
      !credentials.name.trim() ||
      !credentials.email.trim() ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (credentials.name.trim().length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    if (credentials.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await register(credentials);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erro no registro');
      }
    } catch {
      setError('Erro inesperado durante o registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='register'>
      <div className='register__header'>
        <p className='register__header-text'>
          Preencha os dados para se registrar
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='register__form'>
          <div className='register__form-group'>
            <label htmlFor='name' className='register__form-label'>
              Nome Completo
            </label>
            <input
              className='register__form-input'
              type='text'
              id='name'
              name='name'
              value={credentials.name}
              onChange={handleInputChange}
              required
              placeholder='Digite seu nome completo'
              disabled={isLoading}
              minLength={3}
            />
          </div>

          <div className='register__form-group'>
            <label htmlFor='email' className='register__form-label'>Email</label>
            <input
              className='register__form-input'
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

          <div className='register__form-group'>
            <label htmlFor='password' className='register__form-label'>Senha</label>
            <input
              className='register__form-input'
              type='password'
              id='password'
              name='password'
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder='Digite sua senha'
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <div className='register__form-group'>
            <label htmlFor='confirmPassword' className='register__form-label'>Confirmar Senha</label>
            <input
              className='register__form-input'
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder='confirme sua senha'
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <div className='register__btn-wrapper'>
            <button type='submit' className='register__btn' disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className='register__btn-spinner'></div>
                  Criando conta...
                </>
              ) : (
                <>
                  <i className='register__btn-signIn'></i>
                  Criar Conta
                </>
              )}
            </button>
          </div>

          {error && <div className='error-message'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
