const path = require('path');

module.exports = {
  turbopack: {
    // Ensure Turbopack uses this repository as the workspace root
    root: path.resolve(__dirname),
  },
};
