import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const cwd = process.cwd();

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

export default {
  path: {
    src: path.resolve(cwd, '01_src'),
    fixed: path.resolve(cwd, '02_fixed'),
    preview: path.resolve(cwd, process.env.PREVIEW_DIR),
    release: path.resolve(cwd, '04_release')
  },
  ignore: {
    build: [],
    watch: [],
    deploy: [],
    release: [
      '**/.htaccess',
      '**/wp-config.php',
    ]
  },
  docker: {
    yml: {
      input: path.resolve(cwd, 'docker-compose.yml.base'),
      output: path.resolve(cwd, 'docker-compose.yml'),
    }
  },
  needs: [
    path.resolve(cwd, 'docker/db/data'),
    path.resolve(cwd, 'docker/phpmyadmin/sessions'),
    path.resolve(cwd, '01_src'),
    path.resolve(cwd, '02_fixed'),
    path.resolve(cwd, process.env.PREVIEW_DIR),
    path.resolve(cwd, '04_release'),
  ],
  plumberHandler: {
    errorHandler: function(err) {
      console.log('%s%s%s',
        colors.red,
        err.message,
        colors.reset
      );
      this.emit('end');
    }
  }
};
