const express = require('express')
const nitonyExpress = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const questionRoutes =  require('./routes/questions')
const userRoutes = require('./routes/users')
const profileRoutes = require('./routes/profile')
const subjectsRoutes = require('./routes/subjects')
const yearsRoutes = require('./routes/years')
const port = process.env.PORT || 2060
// cors()
 mongoose.connect("mongodb://localhost:27017/nitonydb", 
 {useNewUrlParser: true},
 {useUnifiedTopology: true}
 );

nitonyExpress.use(bodyParser.urlencoded({extended: false}))
nitonyExpress.use(bodyParser.json())

//Allow Cors
// nitonyExpress.use((req, res, next)=>{
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header("Access-Control-Allow_headers",
//   "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "*")
//     return res.status(200).json({})
//   }
//   next();
// })

nitonyExpress.use(cors())

//Request Routes
const nitony = async () => {
  await nitonyExpress.get('/api/v1/', (req, res, next)=>{
    res.send("Welcome Home")
  }
  )
  await nitonyExpress.use('/api/v1/questions', questionRoutes )
  
  await nitonyExpress.use('/api/v1/users',userRoutes )

  await nitonyExpress.use('/api/v1/profile',profileRoutes )

  await nitonyExpress.use('/api/v1/subjects', subjectsRoutes)
  await nitonyExpress.use('/api/v1/years', yearsRoutes)

  await nitonyExpress.use((req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  })
  await nitonyExpress.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
      err: {
        message: err.message
      }
    })  
  })

  await console.log('#BuildforSDG')
  
  nitonyExpress.listen(port);
};

 module.exports = nitony