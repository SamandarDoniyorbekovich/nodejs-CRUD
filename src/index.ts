import express from "express";
import UserRoutes from './routes/user'

const port = 8080
const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({
        message:"hello world"
    })
})

app.use('/user', UserRoutes)

app.listen(port, ()=>{
    console.log("server in runnig")
})