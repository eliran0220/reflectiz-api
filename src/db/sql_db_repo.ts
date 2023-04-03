import { RowDataPacket } from 'mysql2/promise';
import {db} from '../utils/db';

class SqlDb {
    async getUnscannedDomains() {
        let unscanned;
        try {
            const query = `SELECT * FROM DOMAINS WHERE attributes IS ?`;
            const values = [null];
            const db_result = await db.query(query,values) as RowDataPacket[];
            unscanned = db_result[0];
            console.log(unscanned)
            return unscanned;
        } catch (err) {
            throw err;
        }
    }

    async getDomainInformation(domain: string) {
        try {
            const query = `SELECT * FROM DOMAINS WHERE domain = ?`
            const values = [domain];
            const db_result = await db.query(query,values) as RowDataPacket[];
            const information = db_result[0]
            return information;
        } catch (err) {
            throw err;
        }
    }

    async insertDomain(domain:string): Promise<number> {
        try {
            const query = `INSERT INTO DOMAINS (domain) VALUES (?);`
            const values = [domain];
            const db_result = await db.query(query,values) as RowDataPacket[];
            const id = db_result[0].insertId;
            return id;
        } catch (err) {
            throw err;
        }
    }

    async updateDomainAttributes(domain_id: number, attributes: string) {
        try {
            const query = `UPDATE DOMAINS SET attributes = ? WHERE domain_id = ?;`;
            const values = [attributes, domain_id];
            const db_result = await db.query(query,values) as RowDataPacket[];
            const result = db_result[0];
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new SqlDb();