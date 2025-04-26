import axios from "axios";

const API_URL = "http://localhost:3001/groups";

export const getGroups = () => {
  return axios.get(API_URL);
};

export const getGroupById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createGroup = (groupData) => {
  return axios.post(API_URL, groupData);
};

export const updateGroup = (id, groupData) => {
  return axios.put(`${API_URL}/${id}`, groupData);
};

export const deleteGroup = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};