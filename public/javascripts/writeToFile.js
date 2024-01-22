var fs = require('fs');

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

module.exports = writeToFile;
