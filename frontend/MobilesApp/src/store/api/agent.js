import axios from "axios";

axios.defaults.baseURL = "https://0c2b-2001-fb1-179-8416-6c2a-3a39-8e28-84c0.ngrok-free.app/api";

const multipartForm = {
  headers: { "Content-Type": "multipart/form-data" },
};

const responseBody = (res) => res.data;

const req = {
  get: (url, options = {}) => axios.get(url, options).then(responseBody),
  post: (url, data) => axios.post(url, data).then(responseBody),
  postForm: (url, data) =>
    axios.post(url, data, multipartForm).then(responseBody),
};

export default {
  imgCalDiabetes: async (img) => {
    var formData = new FormData();
    formData.append("fileImages", {
      uri: img,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    return req.postForm("/image", formData);
  },
  user: {
    newByName: (data) => req.post("/user/new-user-by-name", data),
  },
  hearing: {
    createHearing: (data) => req.post("/hearing", data)
  }
};