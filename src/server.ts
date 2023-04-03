import { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./utils/constants";
import urlController from "./routers/url_routers";
import * as dotenv from 'dotenv';
import {connect,initDb} from './utils/db';
import { ErrorResponse, NotFound } from "./exceptions/exceptions";
class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.setConfig();
    this.initMiddelwares();
    this.setRouters();
    this.initResponseMiddlewares()
  }

  private setConfig() {
    dotenv.config();
  }

  private setRouters() {
    this.app.use('/api',urlController.router);
  }

  private initMiddelwares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended:true}));
    this.app.use(cors());
  }

  private initResponseMiddlewares(){
    this.app.use(NotFound)
    this.app.use(ErrorResponse);
  }


  public async startServer() {
    await connect();
    await initDb();
    this.app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server is listening on port ${PORT}`)
    });
  }
}

const app = new App();
export default app;