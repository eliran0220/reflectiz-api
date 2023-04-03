import { Router } from 'express';
import  urlController from '../controllers/url_controller';
import errorWrapper from '../utils/errorWrapper';
export class UrlRouters {
    public router = Router();
    
    constructor() {
      this.setRoutes();
    }
    public setRoutes() {
      this.router.post('/insert', errorWrapper(urlController.insertDomain));
      this.router.get('/scan',errorWrapper(urlController.scanDomains))
      this.router.get('/:domain',errorWrapper(urlController.getUrl));
    }
  }

  export default new UrlRouters();