import fs from 'fs';
import path from 'path';
import config from '../config';

const cwd = process.cwd();

function initDocker() {
  const base = fs.readFileSync(config.docker.yml.input, { encoding: 'utf8' });
  const yml = base.replace(/#{([^{]+)}/imgs, (matched, envName)=>{
    return process.env[envName] || '';
  });
  fs.writeFileSync(config.docker.yml.output, yml, { encoding: 'utf8' });
};

function initDir() {
  function createDir(dir) {
    const dirPath = path.resolve(cwd, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  }

  for (const dir of config.needs) {
    createDir(dir);
  }
};

export function initfiles(done) {
  initDocker();
  initDir();
  done();
}
