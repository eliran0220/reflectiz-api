import {Logger} from './constants';
import chalk from 'chalk';
class logger implements Logger {

    info(module: string, func: string): void {
        console.log(chalk.magenta(`Starting module ${module} in function ${func}`))
    }

    end(module: string, func: string): void {
        console.log(chalk.magenta(`Ending module ${module} in function ${func}`))
    }

    verboseCalling(module: string, func: string,calling: string, params?: any): void {
        console.log(chalk.cyan(`${module} - function ${func} calling ${calling} with params: ${params}`))
    }

    verboseEnd(module: string, func: string, params?: any): void {
        console.log(chalk.green(`${module} - function ${func} has returned with result:`))
    }
    
    error(module: string, func: string, err: any): void {
        console.log(chalk.red(`${module} has thrown an error at function: ${func}`))
        console.log(err);
    }
}

export default new logger();