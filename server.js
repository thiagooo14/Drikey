// const jsonServer = require('json-server');
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db; // Lowdb instance
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    const { id, name, email, token } = user;
    res.json({ id, name, email, token });
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos' });
  }
});

server.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  const db = router.db;
  const user = db.get('users').find({ token }).value();

  if (user) {
    const { id, name, email } = user;
    res.json({ id, name, email });
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server rodando na porta 3001');
});
