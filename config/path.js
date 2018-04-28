let path_base = {
  dev  : 'resources/',
  dist : 'html/'
};

let path = {
  dev : {
    dummy : path_base.dev + '_dummy/',
    css : path_base.dev + 'css/**/*.scss',
    img : path_base.dev + 'img/**/*.+(jpg|jpeg|png|gif|svg)',
    js  : [
      path_base.dev + 'js/vendor/*.js',
      path_base.dev + 'js/components/*.js',
      path_base.dev + 'js/main/*.js'
    ]
  },
  dist : {
    css : path_base.dist + 'common/css/',
    img : path_base.dist + 'common/img/',
    js  : path_base.dist + 'common/js/'
  }
};

module.exports = {
  path_base: path_base,
  path: path
};