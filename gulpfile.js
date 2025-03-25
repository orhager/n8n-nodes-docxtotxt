const { src, dest } = require('gulp');

function copyIcons() {
  return src('*.svg')
    .pipe(dest('dist/'));
}

exports.default = copyIcons; 