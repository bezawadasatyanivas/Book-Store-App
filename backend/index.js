import express from "express";
import {PORT,mongodbconn} from './config.js';
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';


const app=express();

//middleware
app.use(express.json());
app.use(cors());
app.use('/books',booksRoute);



// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowesHeaders:[Content-Type],
// }));


app.get('/', (request, response)=>{
 console.log(request)
 return response.status(200).send("app is running")
});




mongoose.connect(mongodbconn).
then(()=>{
    console.log('connected to db!');
    app.listen(PORT,()=>{
        console.log(`Listening to the port-${PORT}`);
    });

}).catch((error)=>{
    console.log(error)
});



