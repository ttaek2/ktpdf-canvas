import axios from 'axios';
import apiPath from "./enum/apiPath";

export default class ApiFetch {
  private url: string;
  private data?: object;
  private config?: object;

  constructor(url: string, data = null, config = {}) {

    const urlWithDomain = `${apiPath.DOMAIN.HOSTNAME}:${apiPath.DOMAIN.PORT}${url}`;    

    this.url = urlWithDomain;
    this.data = data;
    this.config = config
  }

  get(): Promise<any> {
    let config;
    if (this.data) {
      const params = {...this.data};
      config = {...this.config, params};
    } else {
      config = {...this.config};
    }

    return axios.get(this.url, config).catch(error => {
      if (error.response.status === 401) {
        return false
      }
      if (error.response.status === 400) {
        return false
      }
      if (error.response.status === 404) {
        return false
      }
      if (error.response.status === 500) {
        return false
      }
      if (error.response.status === 502) {
        return false
      }
    });
  }

  async post(): Promise<any> {

    
    return await axios.post(this.url, this.data, this.config).catch(error => {
      const errorResponse = error.response;
      if (errorResponse.status === 401 || errorResponse.status === 404) {
        return false
      } else {
        return errorResponse;
      }
    });
  }
}
