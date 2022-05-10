//const http = require("https");
///TODO: Convertir a mock

function get(url, callbackFn){
    const res = {//guardando los callbacks para los eventos: data, end, error
        callbacks: {},
        on: function(event, callbackFn2){            
            this.callbacks[event] = callbackFn2;
        },
        statusCode: 200
    };
    switch(url){
        case 'https://www.nosoyunlinkvalido.com':
            res.statusCode = undefined;
        break;

        case 'https://github.com/natarivera/md-links/settings':
            res.statusCode = 404;
        break;
        default: 
         res.statusCode = 200;
    }
    callbackFn(res);
    res.callbacks.end();
}

module.exports = {get};

