const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const { default: axios } = require("axios");
const SubmissionRepository = require("../repositories/submissionRepository");

const submissionRepository = new SubmissionRepository();

async function evaluationWorker(queueName) {
    console.log("Evaluation worker kicks in");
    new Worker(queueName, async job => {
        console.log("JOB->", job.data);
        if (job.name === 'EvaluationJob') {
            try {
                const {userId, submissionId} = job.data;
                const jobData = job.data;
                
                const updateSub = await submissionRepository.updateSubmission(submissionId, {status: jobData.response.status});
                
                console.log("Submission update status:", updateSub);

                const response = await axios.post('http://localhost:3003/sendPayload', {
                    userId: userId,
                    payload: jobData
                });
                
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error during Axios request:', error.message);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                }
            }
            console.log(job.data);
        }
    }, { connection: redisConnection });
}

module.exports = evaluationWorker;