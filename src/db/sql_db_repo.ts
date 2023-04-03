import { RowDataPacket } from 'mysql2/promise';
import {db} from '../utils/db';
import logger from '../utils/logger';

class SqlDb {
    async getUnscannedDomains() {
        let unscanned;
        try {
            logger.info('SqlDb','getUnscannedDomains');
            const query = `SELECT * FROM DOMAINS WHERE attributes IS ?`;
            const values = [null];
            logger.verboseCalling('SqlDb','getUnscannedDomains','sql query',{query,values});
            const db_result = await db.query(query,values) as RowDataPacket[];
            logger.verboseEnd('SqlDb','insertDomain/sql_query',db_result[0]);
            unscanned = db_result[0];
            console.log(unscanned)
            return unscanned;
        } catch (err) {
            throw err;
        }
    }

    async getDomainInformation(domain: string) {
        try {
            logger.info('SqlDb','getDomainInformation');
            const query = `SELECT * FROM DOMAINS WHERE domain = ?`
            const values = [domain];
            logger.verboseCalling('SqlDb','getDomainInformation','sql query',{query,values});
            const db_result = await db.query(query,values) as RowDataPacket[];
            logger.verboseEnd('SqlDb','getDomainInformation/sql_query',db_result[0]);
            const information = db_result[0]
            console.log(information)
            return information;
        } catch (err) {
            throw err;
        }
    }

    async insertDomain(domain:string): Promise<number> {
        try {
            logger.info('SqlDb','insertDomain');
            const query = `INSERT INTO DOMAINS (domain) VALUES (?);`
            const values = [domain];
            logger.verboseCalling('SqlDb','insertDomain','sql query',{query,values});
            const db_result = await db.query(query,values) as RowDataPacket[];
            logger.verboseEnd('SqlDb','insertDomain/sql_query',db_result[0]);;
            const id = db_result[0].insertId;
            return id;
        } catch (err) {
            throw err;
        }
    }

    async updateDomainAttributes(domain_id: number, attributes: string) {
        try {
            logger.info('SqlDb','updateDomainAttributes');
            const query = `UPDATE DOMAINS SET attributes = ? WHERE domain_id = ?;`;
            const values = [attributes, domain_id];
            logger.verboseCalling('SqlDb','updateDomainAttributes','sql query',{query,values});
            const db_result = await db.query(query,values) as RowDataPacket[];
            logger.verboseEnd('SqlDb','insertDomain/sql_query',db_result[0]);
            const result = db_result[0];
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new SqlDb();