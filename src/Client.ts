import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios";
import Config from "./Config";

export default class Client {

 public http: AxiosInstance
 public config: Config

 constructor(config: Config) {
  this.config = config
  this.http = axios.create({
   validateStatus: status => status < 500
  })
 }

 public request = async (
      endpoint: string,
      params?: AxiosRequestConfig['params'],
      method: Method = 'GET',
      headers?: Record<string, any>
  ): Promise<any> => {
   return new Promise<any>((resolve, reject) => {
    try {
     const payloadKey = ['PUT', 'POST', 'PATCH', 'DELETE'].some(m => m === method) ? 'data' : 'params'

     let request = {
      headers: { ...this.buildHeaders(), ...headers },
      method,
      url: `${this.config.getApi()}/${endpoint}`
     }

     if (params) {
      request = { ...request, [payloadKey]: params }
     }

     this.http(request).then(resolve, e => {
      reject(e)
     })
    } catch (e) {
     reject(e)
    }
   })
  }

 private buildHeaders = (): Record<string, any> => {
  return {
   Authorization: `Bearer ${this.config.getToken()}`,
   'Content-Type': 'application/json'
  }
 }
 }