const Submission = require("../models/submissionModel");

class SubmissionRepository {
    constructor() {
        this.submissionModel = Submission;
    }

    async createSubmission(submission) {
        const response = await this.submissionModel.create(submission);
        return response;
    }

    async updateSubmission(id, data) {
        const response = await this.submissionModel.updateOne(
            {_id: id},
            {$set: data}
        )

        return response.modifiedCount;
    }
}

module.exports = SubmissionRepository;