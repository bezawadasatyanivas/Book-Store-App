import React,{useState,useEffect} from 'react'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai'
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import { BsInfoCircle} from 'react-icons/bs'
import axios from 'axios';

const Home = () => {
  const [books,setBooks]=useState([]);
    const [loading,setLoading]=useState([false]);

    useEffect(()=>{
      setLoading(true);
      axios.get('http://localhost:3333/books')
      .then((response)=>{

        setBooks(response.data);
        setLoading(false);
      }).catch((error)=>{
        console.log(error);

      });

      }

    ,[]);
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className='text-3xl my-8'>
           Books List
        </h1>
        <Link to="/books/create">
        < MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading ? (<Spinner/>):(
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md max-md:hidden'>No.</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>PublishYear</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Operations</th>

            </tr>
          </thead>
          <tbody>
            {books.map((book,index)=>(
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-centre'>{index+1}</td>
                <td className='border border-slate-700 rounded-md text-centre'>{book.title}</td>
                <td className='border border-slate-700 rounded-md text-centre'>{book.author}</td>
                <td className='border border-slate-700 rounded-md text-centre'>{book.publishYear}</td>
                <td className='border border-slate-700 rounded-md text-centre'>
                  <div className='flex justify-centre gap-x-4'>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle  className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>


              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home