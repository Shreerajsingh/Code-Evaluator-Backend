const submissionQueue = require("../queues/submissionQueue");

async function submissionProducer(payload) {
    console.log(payload);
    await submissionQueue.add("SubmissionJob", payload);

    return {message: "Successfully added a new submission job..."};
}

module.exports =  submissionProducer;