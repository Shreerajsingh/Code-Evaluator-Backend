const fetchProblemDetails = require("../apis/problemApi");
const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
    constructor(submissionRepository) {
        //inject
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return "pong";
    }

    async addSubmission(submissionPayload) {
        const problemId = submissionPayload.problemId;
        const problemAdminApiResponse = await fetchProblemDetails(problemId);

        if(!problemAdminApiResponse) {
            // TODO: 'Add Error Handler';
            return {message: "Not able to create the submission"}
        }

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codestub => (codestub.language.toLowerCase() === submissionPayload.language.toLowerCase()));

        console.log(languageCodeStub);

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;

        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        
        if(!submission) {
            // TODO: 'Add Error Handler';
            return {message: "Not able to create the submission"}
        }

        const testCases = problemAdminApiResponse.data.testCases;

        const inputString = testCases.length + '\n' + testCases.map(tc => tc.input).join('\n');
        const outputString = testCases.map(tc => tc.output).join('\n');

        const response = await SubmissionProducer({
            [submission._id]: {
                code: submission.code,
                language: submission.language,
                inputTestCases: inputString,
                outputTestCases: outputString,
                userId: submissionPayload.userId,
                submissionId: submission._id
            }
        });

        console.log(response);

        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService;