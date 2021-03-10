import axios from "axios"

export default class API {
  static get(moduleName) {
    return new Promise(async (resolve, reject) => {
      try {
        const opts = this._opts(moduleName, "get");

        const response = await axios(opts);

        resolve(response);
      } catch (err) {
        console.error(err.response);

        if (err.response && err.response.status == 401) {
          localStorage.clear();
          window.location = "/auth/login";
        }

        reject(err);
      }
    })
  }

  static post(moduleName, data) {
    
    return new Promise(async (resolve, reject) => {
      try {
        const opts = this._opts(moduleName, "post", data);

        const response = await axios(opts);
        resolve(response);
      } catch (err) {
        console.error(err.response);

        if (err.response && err.response.status == 401) {
          localStorage.clear();
          window.location = "/auth/login";
        }

        reject(err);
      }
    })
  }

  static _opts(moduleName, method, data) {
    let token = localStorage.getItem("token");

    const opts = {
      method: method,
      url: `${this.apiUrl()}/${moduleName}`
    };

    if (token) {
      opts.headers = {
        "Authorization": `Bearer ${token}`
      };
    }

    if (data) {
      opts.data = data
    };

    return opts;
  };

  static apiUrl() {
    return 'http://127.0.0.1:3000/api';
  };
};