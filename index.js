'use strict';
const robotstxt = require('generate-robotstxt').default;

function RobotWebpackPlugin (options) {
  this.options = options;
}

RobotWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    robotstxt(this.options)
      .then((content) => {
        compilation.assets['robots.txt'] = {
          source: function () {
            return content;
          },
          size: function () {
            return content.length;
          }
        };

        callback();
      });
  });
};

module.exports = RobotWebpackPlugin;
