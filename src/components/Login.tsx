const Login = () => {
  return (
    <>
      <div>
        <p>Faça Login para entrar</p>
      </div>
      <div>
        <form>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Digite seu email'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Digite sua senha'
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
