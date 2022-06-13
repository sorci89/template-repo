const axios = require("axios");

const http = () => {
  const instance = axios.create({
    baseUrl: "",
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
  return { post, get, _instance: instance };
};

module.exports = http();
