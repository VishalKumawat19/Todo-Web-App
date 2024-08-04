const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//user routes
const userRouter = require('./routes/authRoutes')
app.use('/api/v1/users',userRouter)

//todo routes
const todoRouter = require('./routes/todoRoutes')
app.use('/api/v1/todo',todoRouter)

app.use('*',(req,res)=>{
    res.status(404).json({message:"Oops! The page you are looking for does not exist."})
})










module.exports = app