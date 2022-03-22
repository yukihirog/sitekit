import path from 'path';

const cwd = process.cwd();

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

export default {
  path: {
    src: path.resolve(cwd, '01_src'),
    fixed: path.resolve(cwd, '02_fixed'),
    preview: path.resolve(cwd, '03_preview'),
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
