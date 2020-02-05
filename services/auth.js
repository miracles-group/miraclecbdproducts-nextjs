import request from "../utils/request";

const login = params => {
  return request({
    url: "/Users/authenticate",
    method: "POST",
    data: params
  });
};

const createCompany = params => {
  return request({
    url: "/company",
    method: "POST",
    data: params
  });
};

const getProfile = params => {
  return request({
    url: `/company/${params}`,
    method: "GET"
  });
};

const updateProfile = (username, params) => {
  return request({
    url: `/company/${username}`,
    method: "PATCH",
    data: params
  });
};

export { login, createCompany, getProfile, updateProfile };
