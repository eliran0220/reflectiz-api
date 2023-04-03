import { AxiosResponseHeaders } from "axios";

export const PORT = 3000;
export const HOST = 'localhost'
export const API_KEY = "804bb57fe9be42132b78f7a5368687821001032c1fc8223f05e2641ad0dbac51"
export const URL_REGEX = new RegExp('[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)');
export const INTERVAL_SECONDS = 1000 * 60 * 4 + 1; // to ensure we send a request after 4 seconds we will add 1 more second.
export const VT_ENDPOINTS = {
    domain: 'https://www.virustotal.com/api/v3/domains/'
}

export const defaultHeaders = {
    accept: 'application/json',
    'x-apikey': API_KEY
  };

export enum HTTP_METHODS {
    POST = "post",
    GET = "GET",
    DELETE = "delete",
    patch = "patch"
}

export interface INSERT_DTO {
    domain: string
}

export interface DOMAIN_DTO {
    domain_id: number,
    domain: string,
    attributes: JSON,
    created_at: Date
}

export interface IResponse {
    status: number,
    message: string,
    data: any
}

export interface AXIOS_RESPONSE {
    status: number,
    statusText: string,
    headers: AxiosResponseHeaders,
    data: any
}

export interface Logger {
    info(module: string, func: string): void;
    verboseCalling(module: string, func: string, calling: string, params?: any): void;
    verboseEnd(module: string, func: string, params?: any): void;
    error(module: string, func: string, err: any): void;
}

