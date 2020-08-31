const nitony = require('express')
router = nitony.Router()


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'now on GET  Porfile route'
    }) 
}) 

 router.get('/:id', (req, res, next)=>{
     const id = req.params.id
     res.status(200).json({
         message: id
     }) 
 }) 


 router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'now on Profile POST route'
    })
}) 


router.patch('/:id', (req, res, next)=>{
    if(res.status(200)){
        res.send({message: "patched" })
    }
    else{
        res.send(error)
    }
})
router.delete('/:id', (req, res, next)=>{
    if(res.status(200)){
        res.send({
            message: "deleted"
        })

    }
    else{
        res.send(error)
    }
})
module.exports = router