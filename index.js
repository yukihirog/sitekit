import fs from 'fs';
import path from 'path';
import gulpCli from 'gulp-cli';

const pathDotEnv = path.resolve(process.cwd(), './.env');
const pathDotEnvSample = path.resolve(process.cwd(), './.env.sample');
if (!fs.existsSync(pathDotEnv) && fs.existsSync(pathDotEnvSample)) {
  fs.writeFileSync(pathDotEnv, fs.readFileSync(pathDotEnvSample, { encoding: 'utf8' }), { encoding: 'utf8' });
}

gulpCli();
