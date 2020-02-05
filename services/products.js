import request from "../utils/request";
import axios from "axios";

export const getProduct = () => {
  return axios({
    url: `https://miraclecbdproducts.com/api/product/?username=phamminh1309`,
    method: "GET"
  });
};

export const createProduct = params => {
  return request({
    url: "/products",
    method: "POST",
    data: params
  });
};

export const setting = params => {
  return request({
    url: "/setting",
    method: "POST",
    data: params
  });
};

export const getSetting = () => {
  return request({
    url: "/setting",
    method: "GET"
  });
};

export const autoSync = () => {
  return request({
    url: "/Products/autosync",
    method: "GET"
  });
};
