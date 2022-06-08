const axios = require("axios");

const http = (baseurl) => {
  const instance = axios.create({
    baseUrl: baseurl || "",
    timeout: 3000,
  });
  const post = async (...params) => {
    try {
      const resp = await instance.post(...params);
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const get = async (...params) => {
    try {
      const resp = await instance.get(...params);
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };
  return { post, get };
};

module.exports = http;
