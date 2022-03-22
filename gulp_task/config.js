import path from 'path';

const cwd = process.cwd();

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

export default {
  src: path.resolve(cwd, 'src'),
  fixedsrc: path.resolve(cwd, 'fixed'),
  dest: path.resolve(cwd, 'dest'),
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
