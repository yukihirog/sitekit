import deepmerge from 'deepmerge';
import base from './config.base.js';
import production from './config.production.js';
import develop from './config.develop.js';
import local from './config.local.js';

const mode = process.env.NODE_ENV || 'develop';
const config = deepmerge(
  base,
  mode === 'production' ? production : develop,
  mode === 'production' ? null : local
);

export default config