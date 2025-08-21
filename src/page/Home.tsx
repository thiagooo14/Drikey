import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  return (
    <>
      <h1>Drikey</h1>
      {isLoginScreen ? <Login /> : <Register />}
      <button onClick={() => setIsLoginScreen(!isLoginScreen)}>
        Switch to {isLoginScreen ? 'Register' : 'Login'}
      </button>
    </>
  );
};

export default Home;
