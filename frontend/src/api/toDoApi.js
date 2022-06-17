import axios from "axios";

export const toDoApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 3000,
  });
  const post = async (path, data) => {
    try {
      const resp = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const get = async (path) => {
    try {
      const resp = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };
  return { post, get };
};
