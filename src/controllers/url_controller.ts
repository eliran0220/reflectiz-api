import { Request, Response, NextFunction} from "express";
import domain_service from "../services/domain_service";
import { db } from "../utils/db";
import { RowDataPacket } from "mysql2";
import { ServerException } from "../exceptions/exceptions";
export class UrlController {

    async insertDomain(req: Request, res:Response, next: NextFunction) {
      try {
        const {domain} = req.body
        const response = await domain_service.insertDomain(domain);
        res.json(response)
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }

    async getUrl(req: Request, res: Response, next: NextFunction) {
      try {
        const domain = req.params.domain;
        const information = await domain_service.getDomainInformation(domain);
        res.json(information);
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }

    async scanDomains(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await domain_service.getUnscannedDomains();
        res.json(result)
      } catch (err) {
        console.log(err);
        next(new ServerException(`Server error when acceessing ${req.url})`,500));
      }
    }
  }

  export default new UrlController();
