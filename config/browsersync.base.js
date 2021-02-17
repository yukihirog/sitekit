const pathConfig     = require('./path'),
      path_base      = pathConfig.path_base,
      path           = pathConfig.path
      browserSyncSSI = require('browsersync-ssi')
;

module.exports = {
  notify: false,
  server : {
    baseDir : path_base.dist,
    directory: true,
    middleware : [
      browserSyncSSI({
        baseDir : path_base.dist,
        ext     : '.html'
      })
    ]
  }
};
