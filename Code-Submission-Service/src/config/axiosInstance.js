const { default: axios } = require("axios");

const axiosInstance = axios.create();

module.exports = axiosInstance;