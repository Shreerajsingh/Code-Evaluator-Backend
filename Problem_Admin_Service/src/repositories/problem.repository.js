const {Problem} = require('../models');

class ProblemRepository {
    async createProblem(problemData) {
        try {
            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty,
                testCases: (problemData.testCases) ? problemData.testCases : [],
                codeStubs: (problemData.codeStubs) ? problemData.codeStubs : [],
                editorial: (problemData.editorial) ? problemData.editorial : {},
            })

            return problem;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getProblem(id) {
        const problem = await Problem.findById(id);

        return problem;
    }

    async getAllProblems() {
        const problems = await Problem.find({});
        return problems;
    }

    async deleteProblem(id) {
        const response = await Problem.deleteOne({_id: id});
        return response.deletedCount == 0 ? false : true;
    }

    async updateProblem(id, data) {
        const response = await Problem.updateOne(
            {_id: id},
            {$set: data}
        );
        return response.matchedCount == 0 ? false : true;
    }
}

module.exports = ProblemRepository;

//Here we write mongoose queries