// https://www.npmjs.com/package/htpasswd-authenticator

import htpasswd from 'htpasswd-authenticator';
import fs from 'fs';
import NodeCache from 'node-cache';

const { HTPASSWD_FILE = 'test.htpasswd' } = process.env;

const fileCache = new NodeCache({ stdTTL: 3, checkperiod: 5 });
const fileCacheKey = 'file';
const getFileWithCache = () => {
  let file = fileCache.get(fileCacheKey);
  if (file === undefined) {
    file = fs.readFileSync(HTPASSWD_FILE, 'utf-8');
    fileCache.set(fileCacheKey, file);
  }
  return file;
};

const idpassAuth = async (id, pass) => {
  return await htpasswd.authenticate(id, pass, getFileWithCache());
};

const idExistsAUth = async (id) => {};

export default {
  idpassAuth,
};
