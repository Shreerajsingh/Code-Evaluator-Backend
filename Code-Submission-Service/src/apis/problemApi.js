const { PROBLEM_ADMIN_SERVICE_URL } = require("../config/serverConfig");
const axiosInstance = require("../config/axiosInstance");

const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblemDetails(problemId) {
    try {
        const uri = PROBLEM_ADMIN_API_URL + `/problems/${problemId}`;
        console.log("URL", uri);
        const response = await axiosInstance.get(uri);
        return response.data;
    } catch (error) {
        console.log("Somthing went wrong while fetching problem details");
        console.log(error);
    }
}

module.exports = fetchProblemDetails;