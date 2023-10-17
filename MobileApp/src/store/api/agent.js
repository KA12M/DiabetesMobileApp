import axios from "axios";
import { config } from "../../helper/config";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = config.API_URL;

console.log(config.API_URL);

const responseBody = (res) => res.data;

const multipartForm = {
  headers: { "Content-Type": "multipart/form-data" },
};

axios.interceptors.response.use(
  async (res) => {
    return res;
  },
  (error) => {
    const { status, data, headers, config } = error.response;
    switch (status) {
      case 400:
        console.log(data);
        break;
      case 401:
        console.log(data);
        break;
      case 404:
        console.log(data);
        break;
      case 500:
        console.log(data);
        break;
    }
    return Promise.reject(error);
  }
);

const req = {
  post: (url, data) => axios.post(url, data).then(responseBody),
  postForm: (url, data) =>
    axios.post(url, data, multipartForm).then(responseBody),
};

export const ImageAPI = {
  CalDiabetes: (img) => {
    var formData = new FormData();
    formData.append("fileImages", {
      uri: img,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    return req.postForm("/image", formData);
  },
};
