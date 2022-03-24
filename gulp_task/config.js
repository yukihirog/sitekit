import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const cwd = process.cwd();

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

const pathConfig = {
  src: path.resolve(cwd, '01_src'),
  fixed: path.resolve(cwd, '02_fixed'),
  preview: path.resolve(cwd, process.env.PREVIEW_DIR),
  release: path.resolve(cwd, '04_release')
};

export default {
  path: pathConfig,
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
  browserSync: {
    plain: {
      watch: true,
      server: {
        baseDir: pathConfig.preview,
        index: 'index.html'
      },
      notify: false,
      ghostMode: false
    },
    proxy: {
      proxy: 'localhost' + (process.env.PREVIEW_EXTERNAL_PORT ? ':' + process.env.PREVIEW_EXTERNAL_PORT : ''),
      port: 80,
      watch: true,
      files: '**/*',
      notify: false,
      ghostMode: false
    }
  },
  needs: [
    path.resolve(cwd, 'docker/db/data'),
    path.resolve(cwd, 'docker/db/entry'),
    path.resolve(cwd, 'docker/phpmyadmin/sessions'),
    pathConfig.src,
    pathConfig.fixed,
    pathConfig.preview,
    pathConfig.release
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
