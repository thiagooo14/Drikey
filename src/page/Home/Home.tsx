import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './Home.scss'

const Home = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  return (
    <div className='home'>
      <h1 className='home__title'>Drikey</h1>
      {isLoginScreen ? <Login /> : <Register />}
      <div className="home__switch-text">
        {isLoginScreen ? (
          <p>
            Ainda não tem conta?{' '}
            <span
              className="home__switch-link"
              onClick={() => setIsLoginScreen(false)}
            >
              Cadastre-se
            </span>
          </p>
        ) : (
          <p>
            Já possui conta?{' '}
            <span
              className="home__switch-link"
              onClick={() => setIsLoginScreen(true)}
            >
              Faça o Log-in
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
