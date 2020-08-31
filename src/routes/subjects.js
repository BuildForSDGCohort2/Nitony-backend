const nitony = require('express')
const route = nitony.Router()
const Question = require('../models/questions')

//Get questions by subjects

route.get('/', async (req, res)=>{
    Question.find({}, (err, results)=>{
       if(err) throw err
       let allSubjects=[]
        results.forEach(result => {
           const {questionSubject} =result
           allSubjects.push(questionSubject)
       });
       
       res.status(200).json(allSubjects)
       console.log(allSubjects)
   })

   
})
module.exports = route