const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title can\'t be empty']
    },
    description: {
        type: String,
        required: [true, 'Description can\'t be empty']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: [true, 'Difficulty can\'t be empty'],
        level: 'easy'
    },
    testCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ],
    codeStubs: [
        {
            language: {
                type: String,
                required: true,
                enum: ["CPP", "JAVA", "PYTHON"]
            },
            startSnippet: {
                type: String
            },
            userSnippet: {
                type: String
            },
            endSnippet: {
                type: String
            }
        }
    ],
    editorial: {
        type: String
    }
});


const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;

// Here we r creating mongoose schema model