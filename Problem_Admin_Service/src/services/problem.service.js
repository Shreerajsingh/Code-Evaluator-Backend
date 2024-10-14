const sanitizeMarksownContent = require('../utils/markdownSanitizer');

class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {
        try {
            // throw {"errror" : "Some error"};
            problemData.description = sanitizeMarksownContent(problemData.description);

            const problem = await this.problemRepository.createProblem(problemData);

            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProblem(id) {
        const problem = await this.problemRepository.getProblem(id);

        return problem;
    }

    async getAllProblems() {
        const problems = await this.problemRepository.getAllProblems();

        return problems;
    }

    async deleteProblem(id) {
        const response = await this.problemRepository.deleteProblem(id);

        return response;
    }

    async updateProblem(id, data) {
        if ('description' in data) {
            data.description = sanitizeMarksownContent(data.description);
        }

        const response = await this.problemRepository.updateProblem(id, data);

        return response;
    }
}

module.exports = ProblemService;