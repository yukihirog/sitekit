import path from 'path';

const colors = {
  red: '\u001b[31m',
  reset: '\u001b[0m'
}

export default {
  src: path.resolve('src'),
  dest: path.resolve('dest'),
  vendor: path.resolve('src') + '/**/vendor/**/*',
  plumberHandler: {
    errorHandler: function(err) {
      console.log('%s%s%s',
        colors.red,
        err.messageFormatted,
        colors.reset
      );
      this.emit('end');
    }
  }
};
