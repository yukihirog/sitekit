import fs from 'fs';
import { default as gulpCli } from 'gulp-cli';

const localConfig ='./config/config.local.js';
const localConfigSample ='./config/config.local.sample.js';
if (!fs.existsSync(localConfig)) {
  fs.copyFileSync(localConfigSample, localConfig);
}

gulpCli();