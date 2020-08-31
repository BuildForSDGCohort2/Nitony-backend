const nitony = require('express')
const route = nitony.Router()
const Question = require('../models/questions')
const mongoose = require('mongoose')

// Get all questions
route.get('/', async(req, res) =>{
    try{
     const questions = await Question.find()
     return res.status(200).json(questions)
     
    }catch (error) {
     return res.status(500).json({"error":error})
    }
 })


// Get questions by ID
route.get('/:id', async (req, res) =>{
    try{
        const _id = req.params.id

        const question = await Question.findOne({_id})
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
                    
        }


    }catch(error){return res.status(500).json({"error":error})}
},)

// POST TO QUESTION
route.post('/', async (req, res) => {
    try {
        const { questionDescription } = req.body
        const { questionOptions } = req.body
        const {questionExam} = req.body
        const {questionSubject} =req.body
        const {questionYear} = req.body

        const question = await Question.create({
            questionDescription,
            questionOptions,
            questionSubject,
            questionYear, 
            questionExam

        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//Delete Queston by ID
route.delete('/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const question = await Question.deleteOne({_id})
        if(question.deletedCount ==0){
            return res.status(404).json("No Question found")
        }else{
            return res.status(204).json('deleted')
        }

    }catch (error){
        return res.status(500).json({"error":error})
    }
})
//Edit Question by ID
route.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { questionDescription,
            questionOptions,
            questionSubject,
            questionYear, 
            questionExam } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                questionDescription,
                questionOptions,
                questionSubject,
                questionYear, 
                questionExam
            })    
            return res.status(201).json(question)
        }else{
            question.questionDescription = questionDescription
            question.questionOptions = questionOptions
            question.questionSubject= questionSubject
            question.questionYear= questionYear
            question.questionExam=questionExam
            await question.save()
            return res.status(200).json(question)
           
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})



module.exports = route