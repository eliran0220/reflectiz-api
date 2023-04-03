"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_METHODS = exports.defaultHeaders = exports.VT_ENDPOINTS = exports.API_KEY = exports.HOST = exports.PORT = void 0;
exports.PORT = 3000;
exports.HOST = 'localhost';
exports.API_KEY = "804bb57fe9be42132b78f7a5368687821001032c1fc8223f05e2641ad0dbac51";
exports.VT_ENDPOINTS = {
    domain: 'https://www.virustotal.com/api/v3/domains/'
};
exports.defaultHeaders = {
    accept: 'application/json',
    'x-apikey': exports.API_KEY
};
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["POST"] = "post";
    HTTP_METHODS["GET"] = "GET";
    HTTP_METHODS["DELETE"] = "delete";
    HTTP_METHODS["patch"] = "patch";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
