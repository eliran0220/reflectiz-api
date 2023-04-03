"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = void 0;
const domain_service_1 = __importDefault(require("../services/domain_service"));
const logger_1 = __importDefault(require("../utils/logger"));
class UrlController {
    insertDomain(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('UrlController', 'insertUrl');
                const domain = req.params.url;
                logger_1.default.verbose('UrlController', 'insertDomain', 'DomainService/insertDomain', domain);
                const id = yield domain_service_1.default.insertDomain(domain);
                res.json(`Domain: ${domain} has been recorded with id: ${id}`);
            }
            catch (err) {
                console.log(err);
                res.json(err);
            }
        });
    }
    getUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('UrlController', 'getUrl');
                const { domain } = req.body;
                logger_1.default.verbose('UrlController', 'getUrl', 'DomainService/getDomainInformation', domain);
                const information = yield domain_service_1.default.getDomainInformation(domain);
                return information;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UrlController = UrlController;
exports.default = new UrlController();
