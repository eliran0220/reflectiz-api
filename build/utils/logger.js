"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class logger {
    info(module, func) {
        console.log(chalk_1.default.magenta(`Starting module ${module} in function ${func}`));
    }
    verbose(module, func, calling, params) {
        console.log(chalk_1.default.cyan(`${module} - function ${func} calling ${calling} with params: ${params}`));
    }
    error(module, func, err) {
        console.log(chalk_1.default.red(`${module} has thrown an error at function: ${func}`));
        console.log(err);
    }
}
exports.default = new logger();
