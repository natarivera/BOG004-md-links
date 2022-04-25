const fs = require('fs');
const path = require('path');

const pathExists = function(originPath){  
  const exists = fs.existsSync(originPath);
  console.log(`pathExists(${originPath}) ${exists}`);
  return exists;
}

module.exports = {
  pathExists
};
