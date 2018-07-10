'use strict';
const robotstxt = require('generate-robotstxt').default;

function RobotWebpackPlugin (options) {
  this.options = options;
}

RobotWebpackPlugin.prototype.apply = function (compiler) {
  const me = this;
  compiler.plugin('emit', function (compilation, callback) {
    robotstxt(me.options)
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
