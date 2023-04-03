"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRouters = void 0;
const express_1 = require("express");
const url_controller_1 = __importDefault(require("../controllers/url_controller"));
class UrlRouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.setRoutes();
    }
    setRoutes() {
        this.router.post('/insert/:domain', url_controller_1.default.insertDomain);
        this.router.get('/get/:domain', url_controller_1.default.getUrl);
    }
}
exports.UrlRouters = UrlRouters;
exports.default = new UrlRouters();
