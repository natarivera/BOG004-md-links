const fs = require('fs');
const path = require('path');

/**
 * Valida si el Path Existe
 * @param {*} originPath 
 * @returns true si el path existe false no existe
 */
const pathExists = function(originPath){  
  const exists = fs.existsSync(originPath);
  console.log(`pathExists(${originPath}) ${exists}`);
  return exists;
}

/**
 * Valida si un originPath es relativo o absoluto
 * @param {string} originPath 
 * @returns true si es relativo, falso si es absoluto
 */
 const isRelative = function(originPath){
  const relative = !path.isAbsolute(originPath);
  console.log(`isRelative(${originPath}) ${relative}`);
  return relative;
}

module.exports = {
  pathExists, isRelative
};