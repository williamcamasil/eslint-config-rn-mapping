const fs = require('fs');

module.exports.getIgnoreExports = () => {
  const ignores = [];

  if (fs.existsSync('./lib')) {
    ignores.push('lib/index.ts?(x)');
  }

  if (fs.existsSync('./lib/@types')) {
    ignores.push('lib/@types/**/*.*');
  }

  return ignores.length ? ignores : undefined;
}
