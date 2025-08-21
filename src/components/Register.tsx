const Register = () => {
  return (
    <>
      <div>
        <p>Preencha os dados para se registrar</p>
      </div>
      <div>
        <form>
          <label htmlFor='name'>Nome Completo</label>
          <input
            type='text'
            id='name'
            name='name'
            required
            placeholder='Digite seu nome completo'
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Digite seu email'
          />
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Digite sua senha'
            minLength={6}
          />
        </form>
        <label htmlFor='confirmPassword'>Confirmar Senha</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          placeholder='confirme sua senha'
          minLength={6}
        />
        <button type='submit'>Criar conta</button>
      </div>
    </>
  );
};

export default Register;
