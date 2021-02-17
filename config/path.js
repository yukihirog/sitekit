const path_base = {
  dev  : 'resources/',
  dist : 'html/'
};

const path = {
  dev : {
    css      : path_base.dev + '**/*.scss',
    img      : path_base.dev + '**/*.+(jpg|jpeg|png|gif|svg)',
    js       : [
      path_base.dev + '**/*.js',
      '!' + path_base.dev + 'common/js/**/*.js'
    ],
    commonJS : [
      path_base.dev + 'common/js/vendor/**/*.js',
      path_base.dev + 'common/js/components/**/*.js',
      path_base.dev + 'common/js/main/**/*.js'
    ]
  },
  dist : {
    css      : path_base.dist,
    img      : path_base.dist,
    js       : path_base.dist,
    commonJS : path_base.dist + 'common/js/'
  }
};

module.exports = {
  path_base: path_base,
  path: path
};