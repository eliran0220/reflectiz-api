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
const sql_db_repo_1 = __importDefault(require("../db/sql_db_repo"));
const constants_1 = require("../utils/constants");
const logger_1 = __importDefault(require("../utils/logger"));
class DomainService {
    insertDomain(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('DomainService', 'getUrl');
                const headers = constants_1.defaultHeaders;
                // const result = await helperFunctions.makeHttpRequest(HTTP_METHODS.GET,`${VT_ENDPOINTS.domain}${domain}`,headers);
                // const stringified_result = JSON.stringify(result);
                logger_1.default.verbose('DomainService', 'insertDomain', domain);
                const id = yield sql_db_repo_1.default.insertDomain(domain);
                console.log(`Url has been inserted with id: ${id}`);
                return id;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getDomainInformation(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('DomainService', 'getDomainInformation');
                logger_1.default.verbose('DomainService', 'getDomainInformation', 'SqlDb/getDomainInformation', domain);
                const information = yield sql_db_repo_1.default.getDomainInformation(domain);
                return information;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new DomainService();
