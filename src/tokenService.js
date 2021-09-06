// https://www.npmjs.com/package/jsonwebtoken

import jwt from 'jsonwebtoken';

const { TOKEN_PRIVATE_KEY } = process.env;

const generateToken = (id) => {
  return jwt.sign({ user: id }, TOKEN_PRIVATE_KEY, { expiresIn: '1h' });
};

const validateToken = (token) => {
  try {
    const payLoad = jwt.verify(token, TOKEN_PRIVATE_KEY);
    const { user } = payLoad;

    return user;
  } catch (ex) {
    console.error('token error with ', token, ex);
    return null;
  }
};

export default {
  generateToken,
  validateToken,
};
