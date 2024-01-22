var fs = require('fs');

function readFile(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch (e) {
    console.error(e.message);
    return null;
  } 
}

module.exports = readFile;
