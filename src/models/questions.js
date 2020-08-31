const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionDescription: {
        type:String,
        required:true
    },
    questionSubject: {
        type:String, 
        required:true
    },
    questionExam: {type:String, required: true},
    questionYear:{type:String, required: true},
    questionOptions: [
        {
            option: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)