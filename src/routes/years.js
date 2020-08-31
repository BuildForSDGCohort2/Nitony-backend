const nitony = require('express')
const route = nitony.Router()
const Question = require('../models/questions')

//get questions by year

route.get('/', async(req, res)=>{
    let allYear=[]
    Question.find({}, (err, results)=>
        { if(err) throw err
            results.forEach(result=>
            {
            const {questionYear} = result
            allYear.push(questionYear)
            })
            console.log(allYear)
            res.status(200).json(allYear)
         })
   })


module.exports = route