const express = require('express');

const {ProblemController} = require('../../controllers/index.js');

const problemRouter = express.Router();

// If any req comes and continues with /api, we map it to ProblemController
problemRouter.get('/ping', ProblemController.pingProblemController);

problemRouter.get('/:id', ProblemController.getProblem);

problemRouter.get('/', ProblemController.getProblems);

problemRouter.post('/', ProblemController.addProblem);

problemRouter.delete('/:id', ProblemController.deleteProblem);

problemRouter.put('/:id', ProblemController.updateProblem);

module.exports = problemRouter;
