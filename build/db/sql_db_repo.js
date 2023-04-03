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
const db_1 = require("../utils/db");
const logger_1 = __importDefault(require("../utils/logger"));
class SqlDb {
    getDomainInformation(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('SqlDb', 'getDomainInformation');
                const query = `SELECT * FROM DOMAINS WHERE domain = ?`;
                const values = [domain];
                logger_1.default.verbose('SqlDb', 'getDomainInformation', 'sql query', { query, values });
                const db_result = yield db_1.db.query(query, values);
                const information = db_result[0];
                return information;
            }
            catch (err) {
                throw err;
            }
        });
    }
    insertDomain(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('SqlDb', 'insertDomain');
                const query = `INSERT INTO DOMAINS (domain,attributes) VALUES (?, ?);`;
                const values = [url, data];
                logger_1.default.verbose('SqlDb', 'insertDomain', 'sql query', { query, values });
                const db_result = yield db_1.db.query(query, values);
                const id = db_result[0].insertId;
                return id;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new SqlDb();
