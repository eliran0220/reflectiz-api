import sql_db from '../db/sql_db_repo';
import {AXIOS_RESPONSE, defaultHeaders,DOMAIN_DTO,HTTP_METHODS,INTERVAL_SECONDS,VT_ENDPOINTS} from '../utils/constants';
import helperFunctions from '../utils/helper_functions';
import logger from '../utils/logger';
import axios from 'axios'
var _domains: DOMAIN_DTO[];
 class DomainService {
    interval: any

    public async insertDomain(domain: string) {
        let response;
        try {
            const k = await helperFunctions.makeHttpRequest(HTTP_METHODS.GET,`${VT_ENDPOINTS.domain}${domain}`,defaultHeaders)
            console.log(k)
            logger.info('DomainService','insertDomain');
            logger.verboseCalling('DomainService','insertDomain','HelperFunctions/validateDomain',domain);
            logger.verboseCalling('DomainService','insertDomain','SqlDb/getDomainInformation',domain);
            const is_exists = await sql_db.getDomainInformation(domain)
            if (is_exists.length !== 0) {
                logger.error('DomainService','insertDomain','Domain already exists');
                response = helperFunctions.OkResponseBuilder(`${domain} found`,200);
                console.log("the response is ",response)
            } else {
                logger.verboseCalling('DomainService','insertDomain','SqlDb/insertDomain',domain);
                const id = await sql_db.insertDomain(domain);
                logger.verboseEnd('DomainService/insertDomain','SqlDb/insertDomain',id);
                response = helperFunctions.OkResponseBuilder(`${domain} has been inserted`,200,`Inserted id: ${id}`);
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async getDomainInformation(domain: string) {
        let information;
        let response;
        try {
            logger.info('DomainService','getDomainInformation');
            logger.verboseCalling('DomainService','getDomainInformation','SqlDb/getDomainInformation',domain);
            information = await sql_db.getDomainInformation(domain)
            logger.verboseEnd('DomainService/insertDomain','SqlDb/getDomainInformation',information);
            if (information.length === 0) {
                logger.info('DomainService','getDomainInformation - no records found, inserting domain');
                logger.verboseCalling('DomainService','getDomainInformation','SqlDb/insertDomain',domain);
                information = await sql_db.insertDomain(domain);
                logger.verboseEnd('DomainService/insertDomain','SqlDb/insertDomain',information);
                response  = helperFunctions.OkResponseBuilder('Domain not found, added for later scan. Please check this domain later',200,information);
            } else {
                response = helperFunctions.OkResponseBuilder(`${domain} found`,200,information as DOMAIN_DTO);
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async getUnscannedDomains() {
        let unscanned;
        let response;
        try {
            logger.info('DomainService','getUnscannedDomains');
            logger.verboseCalling('DomainService','getUnscannedDomains','SqlDb/getUnscannedDomains');
            unscanned = await sql_db.getUnscannedDomains() as DOMAIN_DTO[];
            if (unscanned.length === 0) {
                response  = helperFunctions.OkResponseBuilder('No domains to scan',200);
            } else {
                _domains = unscanned;
                this.startInterval();
                this.updatePendingDomains();
                this.interval = setInterval(this.updatePendingDomains,INTERVAL_SECONDS);
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async updatePendingDomains(){
        const domains = _domains.splice(0,4);
            console.log(domains)
            let _pending = []
            if (domains.length === 0) {
                console.log("clearing interval!");
                clearInterval(this.interval)
            }
            _pending = domains.map(async data => {
                const options = {
                    method: HTTP_METHODS.GET,
                    url: `${VT_ENDPOINTS.domain}${data.domain}`,
                    headers: defaultHeaders
                  };
                return axios(options).then(async (response) => {
                    const parsedResponse = JSON.stringify((response as AXIOS_RESPONSE).data.data.attributes);
                    await sql_db.updateDomainAttributes(data.domain_id, parsedResponse)
                    return data.domain_id
                });

            })
            Promise.all(_pending).then(() => {
                console.log('DONE')
            })
    }

    public async startInterval(){
        logger.info('DomainService','startInterval')
        var interval_id = setInterval(() => {
            const domains = _domains.splice(0,4);
            console.log(domains)
            let _pending = []
            if (domains.length === 0) {
                console.log("clearing interval!");
                clearInterval(interval_id)
            }
            _pending = domains.map(async data => {
                const options = {
                    method: HTTP_METHODS.GET,
                    url: `${VT_ENDPOINTS.domain}${data.domain}`,
                    headers: defaultHeaders
                  };
                return axios(options).then(async (response) => {
                    const parsedResponse = JSON.stringify((response as AXIOS_RESPONSE).data.data.attributes);
                    await sql_db.updateDomainAttributes(data.domain_id, parsedResponse)
                    return data.domain_id
                });

            })
            Promise.all(_pending).then(() => {
                console.log('DONE')
            })
        }, INTERVAL_SECONDS);

    }

  }

  export default new DomainService();


