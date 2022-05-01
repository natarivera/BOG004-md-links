const {pathExists, isRelative, convertToAbsolut, isFolder, listFolder, isMarkdownFile, readMarkdownFile, searchLinks, testLinkByRequests
} = require('./functions');
/**
 * Funcion retorna una promesa que resuelve un array de object donde cada 
 * objeto representa un link
 * @param {*} path 
 * @param {*} options 
 * @returns una promesa
 */
function mdLinks(path, options){
  console.log("mdLinks("+path+", "+options+")");
  return new Promise(
    (resolve, reject) => {
      
      if(pathExists(path)){
        if(isRelative(path)){
          path = convertToAbsolut(path); 
        }
        if(isFolder(path)){
          let subFolders = listFolder(path);
          // map: subfolder(string) -> mdLinks: Promise<[]>
          // convierte el arreglo de subfolders en promesas devueltas por mdlinks
          let subMdLinks = subFolders.map(subFolder => mdLinks(path + "\\" + subFolder, options));
          Promise.allSettled(subMdLinks)
            .then(
              (results)=>{
                let arrayLinks = [];                
                results.forEach(
                  (result)=>{
                    if(result.status === "fulfilled"){
                      arrayLinks = arrayLinks.concat(result.value);                      
                    } else {
                      console.log(result.reason);
                    }                                 
                  }
                );                
                resolve(arrayLinks);
              }
            );
        } else {
          if (isMarkdownFile(path)){
             readMarkdownFile(path)
             .then(
               (content) => {
                let arrayLinks = [];
                let links = searchLinks(content);              
                for (var i=0 ; i<links.length; i++){
                  if(options.validate){
                    arrayLinks.push(
                      new Promise(
                        (resolve1, reject1)=>{
                          const link = links[i];
                          testLinkByRequests(link.href)
                            .then(
                              (resultCode)=>{
                                resolve1( {
                                  href: link.href,
                                  text: link.text,
                                  file: path,
                                  status: resultCode,
                                  ok: resultCode == 200 ? 'ok' : 'fail'
                                });
                              }
                            );                        
                        }
                      )
                    );                      
                  } else{                    
                    arrayLinks.push({
                      href: links[i].href,
                      text: links[i].text,
                      file: path
                    });
                  }                
                }
                if(options.validate){                  
                  Promise.allSettled(arrayLinks)
                    .then(
                      (results)=>{                        
                        resolve(
                          results.map(
                          (result)=>result.value
                        ));
                      }
                    );
                }
                else{                  
                  resolve(arrayLinks);
                }              
               }
             );
          } else {
            reject(path + ": No es un archivo de markdown!");
          }          
        }
      } else {
        //TODO: Revisar los mensajes de error
        reject(path + ": El directorio no existe!!");
      }  
    }
  );

}

module.exports =  {mdLinks}