import express from "express";
import { Book } from "../models/booksModel.js";

const router=express.Router();

router.post('/',async(request,response)=>{
  try{
    if(!request.body.title||!request.body.author||!request.body.publishYear){
        return response.status(404).send({message:'enter all fields'});
    }

    const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,
    }
    const book=await Book.create(newBook);
    return response.status(213).send(book);

  }catch(error){
    console.log(error);
    response.status(500).send({message:error.message});
  }
});

router.get('/',async(request,response)=>{
    try{
        const allbooks=await Book.find({});
        if(!allbooks){
            return response.status(500);
        }
        return response.status(213).send(allbooks);

    }catch(error){
      console.log(error);
      response.status(500).send({message:error.message})
    }
  });

  router.get('/:id',async(request,response)=>{
    try{

        const {id}=request.params;

        const bookid=await Book.findById(id);

        return response.status(234).send(bookid);
  
    }catch(error){
      console.log(error);
      response.status(500).send({message:error.message})
    }
  });

  router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title||!request.body.author||!request.body.publishYear){
            return response.status(404).send({message:'some fields missing.'});
        }

       const {id}=request.params;
       const result=await Book.findByIdAndUpdate(id,request.body);
       response.status(234).send({message:'updated.'});

    }catch(error){
      console.log(error);
      response.status(500).send({message:error.message})
    }
  });

  router.delete('/:id',async(request,response)=>{
    try{

        const {id}=request.params
        const deleteid=await Book.findByIdAndDelete(id);
        response.status(213).send({message:'deleted!'})

  
    }catch(error){
      console.log(error);
      response.status(500).send({message:error.message})
    }
  });

export default router;