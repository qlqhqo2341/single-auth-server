import './env.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import authService from './authService.js';
import tokenService from './tokenService.js';

const { PORT = 3000 } = process.env;

const app = express();
app.use('/auth/api/login', bodyParser.json());
app.use('/auth/api/login', bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const authHeaderName = 'jhan-auth';

app.use('/auth/login', express.static('login_static'));
app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/auth/logout', async (req, res) => {
  res.cookie(authHeaderName, 'deleted', { maxAge: -10000, domain: '.jhan.me' });
  res.status(204).send();
});

app.get('/auth/l7check', (req, res) => {
  res.send('OK');
});
app.all('/auth/api/validate', (req, res) => {
  const { [authHeaderName]: auth } = req.cookies;
  if (tokenService.validateToken(auth)) {
    res.send({ success: true });
  } else {
    res.status(401).send({ success: false });
  }
});

app.post('/auth/api/login', async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    res.sendStatus(400);
  }
  const authResult = await authService.idpassAuth(id, password);
  if (authResult) {
    const token = tokenService.generateToken(id);
    res.cookie(authHeaderName, token, { maxAge: 86400000, domain: '.jhan.me' }); // 30m
    res.send({ success: true, token });
  } else {
    res.status(401).send({ success: false });
  }
});

app.listen(PORT);
