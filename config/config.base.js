import path from 'path';

const cwd = path.resolve(process.cwd());

export default {
  mode: process.env.NODE_ENV || 'develop',
  src:  path.resolve(cwd, './src/'),
  dest: path.resolve(cwd, './dest/'),
  server: {
    phpPort: 8000,
    baseDir: path.resolve(cwd, './dest/'),
    index: 'index.html',
  },
  vars: {
    global: {
      host: 'https://www.___.com/',
      startPath: '/',
    },
    '/': {}
  }
}