import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useState,useEffect } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const ShowBook = () => {
  const [book,setBook]=useState([]);
    const [loading,setLoading]=useState([false]);
    const {id}=useParams();

    useEffect(()=>{
      setLoading(true);
      axios.get(`http://localhost:3333/books/${id}`)
      .then((response)=>{

        setBook(response.data);
        setLoading(false);
      }).catch((error)=>{
        console.log(error);

      });

      }

    ,[]);
  


  return (
    <div>
    <BackButton />
    <h1 className='text-3xl my-4'>Show Book</h1>
    {loading ?(
      <Spinner/>
    ):(
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        
        <div className="my-4">

          <div className="my-4">
            <span class="text-xl mr-4 text-gray-500">Book Id:</span>
            <span>{book._id}</span>
          </div>
          

          <div className="my-4">
          <span class="text-xl mr-4 text-gray-500">Title:</span>
            <span>{book.title}</span>
          </div>
          

          <div className="my-4">
          <span class="text-xl mr-4 text-gray-500">Author:</span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
          <span class="text-xl mr-4 text-gray-500">PublishYear:</span>
            <span>{book.publishYear}</span>
          </div>

          <div className="my-4">
          <span class="text-xl mr-4 text-gray-500">Created Date:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className="my-4">
          <span class="text-xl mr-4 text-gray-500">Updated Date:</span>
            <span>{new Date(book.updatedAt).toString()}</span> 
          </div>

        </div>
      </div>
    )}
    </div>
  )
}

export default ShowBook;