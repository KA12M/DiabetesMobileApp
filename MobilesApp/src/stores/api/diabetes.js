import axios from "axios";

axios.defaults.baseURL = "https://5732-202-28-123-199.ngrok-free.app/api";

const multipartForm = {
  headers: { "Content-Type": "multipart/form-data" },
};

const responseBody = (res) => res.data;

const req = {
  post: (url, data) => axios.post(url, data).then(responseBody),
  postForm: (url, data) =>
    axios.post(url, data, multipartForm).then(responseBody),
};

export const imgCalDiabetes = async (img) => {
  var formData = new FormData();
  formData.append("fileImages", {
    uri: img,
    type: "image/jpeg",
    name: "photo.jpg",
  });

  return req.postForm("/image", formData);
};
