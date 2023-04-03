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
exports.initDb = exports.connect = exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.db)
            return exports.db;
        exports.db = yield promise_1.default.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_ROOT_PASSWORD,
            port: Number(process.env.MYSQL_LOCAL_PORT)
        });
        yield exports.db.connect();
        console.log("Connected to db!");
    });
}
exports.connect = connect;
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const init_db_query = `CREATE DATABASE IF NOT EXISTS DB`;
        yield exports.db.query(init_db_query);
        const use_query = `USE DB`;
        yield exports.db.query(use_query);
        const init_url_table = `
        CREATE TABLE IF NOT EXISTS DOMAINS(
            domain_id INT AUTO_INCREMENT,
            domain VARCHAR(255) NOT NULL, 
            attributes JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (url_id));`;
        yield exports.db.query(init_url_table);
    });
}
exports.initDb = initDb;
