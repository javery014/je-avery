// loads its siblings...
module.exports = require('../../' /* foldero */ )(
  './', {
    relative: __dirname,
    ignore: __filename
  });
