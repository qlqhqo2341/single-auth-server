// https://www.npmjs.com/package/jsonwebtoken

import jwt from 'jsonwebtoken';

const { TOKEN_PRIVATE_KEY="abcde", TOKEN_EXPIRE_TIME="1h" } = process.env;

const generateToken = (id) => {
  return jwt.sign({ user: id }, TOKEN_PRIVATE_KEY, { expiresIn: TOKEN_EXPIRE_TIME });
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
