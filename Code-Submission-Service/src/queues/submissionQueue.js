const { Queue } = require("bullmq");
const redisConnection = require("../config/redisConfig");

const submissionQueue = new Queue('SubmissionQueue', {connection: redisConnection});

module.exports = submissionQueue;