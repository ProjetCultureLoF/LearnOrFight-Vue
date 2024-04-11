import axios from "axios";
import { ip } from "@/plugins/ip.js";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "http://" + ip + ":3001/api/v1/",
    });
  }

  async get(url) {
    return await this.axios.get(url);
  }

  async post(url, data) {
    return await this.axios.post(url, data);
  }

  async put(url, data) {
    return await this.axios.put(url, data);
  }

  async delete(url) {
    return await this.axios.delete(url);
  }

  async patch(url, data) {
    return await this.axios.patch(url, data);
  }
}

export const api = new API();

export default {
  install(app) {
    app.config.globalProperties.$api = api;
  },
};
