const mdLinks = require('../');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
const {pathExists} = require('../index');

describe('pathExists', () => {

  it('should be a function', () => {
    expect(typeof pathExists).toBe('function');
  });
  // Probando con una ruta relativa (la carpeta padre ../), la funcion debe devolver true
  it('should return true with a relative path', () => {
    expect(pathExists('../')).toBe(true);
  });
  // Probando con una ruta absoluta, la funcion debe devolver true
  it('should return true with a absolute path', () => {
    expect(pathExists('C:\\Users\\natyc\\md-links\\test')).toBe(true);
  });
  // Probando con una ruta absoluta invalida, la funcion debe devolver false
  it('should return false with an invalid path', () => {
    expect(pathExists('C:\\Users\\natyc\\md-links\\sss')).toBe(false);
  });


});