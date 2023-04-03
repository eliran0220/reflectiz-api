import { Request, Response, NextFunction} from "express";
import domain_service from "../services/domain_service";
import logger from '../utils/logger';
import { db } from "../utils/db";
import { RowDataPacket } from "mysql2";
import { ServerException } from "../exceptions/exceptions";
export class UrlController {

    async insertDomain(req: Request, res:Response, next: NextFunction) {
      try {
        logger.info('UrlController','insertDomain');
        const {domain} = req.body
        logger.verboseCalling('UrlController','insertDomain','DomainService/insertDomain',domain);
        const response = await domain_service.insertDomain(domain);
        logger.verboseEnd('DomainService/insertDomain','SqlDb/getDomainInformation',response);;
        res.json(response)
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }

    async getUrl(req: Request, res: Response, next: NextFunction) {
      try {
        logger.info('UrlController','getUrl');
        const domain = req.params.domain;
        logger.verboseCalling('UrlController','getUrl','DomainService/getDomainInformation',domain);
        const information = await domain_service.getDomainInformation(domain);
        logger.verboseEnd('DomainService/getUrl','DomainService/getDomainInformation',information);;
        res.json(information);
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
      const query = `SELECT * FROM DOMAINS`
      const result = await db.query(query) as RowDataPacket[];
      res.json(result[0]);
    }
    async scanDomains(req: Request, res: Response, next: NextFunction) {
      try {
        logger.info('UrlController','scanDomains');
        const result = await domain_service.getUnscannedDomains();
        res.json(result)
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }
  }

  export default new UrlController();
