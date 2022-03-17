import path from 'path';

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

export default {
  src: path.resolve('src'),
  fixedsrc: path.resolve('fixedsrc'),
  dest: path.resolve('dest'),
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
