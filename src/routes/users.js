const nitony = require('express')
const userRoute = nitony.Router()
const mongoose = require('mongoose')
const Users = require('../models/users')

userRoute.get('/', (req, res, next)=>{
    Users.find()
    .then(results=>{
        res.send(results)
        console.log(results)
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})

userRoute.post('/', (req, res, next)=>{
    const user = new Users({
        _id : mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    })
    try {
        user.save()
        .then(result =>{
            console.log('Saved', result)
        })
    } catch (error) {
        console.log(error)
    }

    res.send({
        message: 'getting all users',
        user
    })
})

userRoute.get('/:id', (req, res, next)=>{
    const id = req.params.id
    Users.findById(id)
    
    .exec()
    .then(doc=>{
        console.log(doc)
        res.send(doc)
    })
    .catch(err =>{
        if(res.status(500)){
          res.send({error:err})

        }
    })
    // try {
    //     exec()
    //     .then(doc   =>{
    //           console.log(id);
    //           res.status(200).json(doc)
    //       }  
    //     )
    // } catch (error) {
    //     res.send(error)
    // }    

})

// userRoute.post('/:id', (req, res, next)=>{
//     id=req.params.id
//     Users.findById(id)
//     res.send({
//         message: 'Posting user with ID',
//         id
//     })
// })

userRoute.patch('/:id', (req, res, next)=>{
    id = req.params.id

    Users.updateOne({_id: id}, {$set: {
        username: req.body.username,
        password: req.body.password
    }})
    .exec()
    .then(result=>{
        res.send({
        message: 'patching user with id',
        result
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })
    })
    
}) 

userRoute.delete('/:id', (req, res, next)=>{
    id= req.params.id
    Users.deleteOne({_id: id})
    .exec()
    .then(result=>{
        res.send(result)
    })
    .catch(error=>{
        res.status(500).json({error: error})
    })
    
    
    
})

module.exports= userRoute