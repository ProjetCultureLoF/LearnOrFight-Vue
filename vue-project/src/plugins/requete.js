import axios from 'axios';

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:3001/api/v1/',
            // timeout: 1000,
            // headers: { 'X-Custom-Header': 'foobar' }
        });
    }

   async get(url) {
        return await this.axios.get(url);
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }

    delete(url) {
        return this.axios.delete(url);
    }

    patch(url, data) {
        return this.axios.patch(url, data);
    }
}

export const api = new API()

export default {
    install(app) {
        app.config.globalProperties.$api = api;
    }
}
