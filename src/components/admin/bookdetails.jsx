import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookdetails() {
    const [book,setBook]=useState([]);
    const [deletebooks,setDeletebook]=useState("")
    const token=sessionStorage.getItem('admin_token')
    const navigate=useNavigate();
    async function deletebook(id) { 

      const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) {
      return; // If the admin cancels the confirmation, stop the deletion process
    }
        try{
            const response=await axios.delete(`http://127.0.0.1:8000/api/v1/app/deletebook/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                  }
            })
            if (response.status===200){
                console.log("Book Deleted")
                toast.warning("Book Deleted")
            }
        }catch(error){
            console.log(error)
        }
        setDeletebook(id)
    }
    function updatebook(id){
        navigate(`/editbook/${id}`)
    }
    useEffect(()=>{
        async function fetchData(){
          try{
            const response=await axios.get('http://127.0.0.1:8000/api/v1/app/getbooks/',{
              headers:{
                'Content-Type':'application/json',
                // 'Authorization':`Token ${token}`
              }
            })
            // console.log(response)
            if(response.status===200){
              setBook(response.data.data)
              console.log(response.data.data)
            }
          }
          catch(error){
            console.error(error)
          }
        }
        fetchData();
      },[deletebooks])
    
  return (
    <>
    {/* <ToastContainer theme="colored" transition={Zoom}/> */}
    <div></div><br/>
    <div></div><br/>
    <div><Navbar/></div>
    <ToastContainer theme="colored" transition={Zoom}/>
    <div className='container'>
    { book
    .map((item)=>(<div
             
             className="product-card"
             key={item.id}
           >
             {/* <Link to={"/Productdetail"}> */}
             <div className="badge">Hot</div>
             <div className="badge2">{item.book_stock}</div>
             <div className="product-tumb">
               <img src={item.image} alt="" />   
             </div>
             <div className="product-details">
               <span className="product-catagory">
                {item.author_name}
                </span>
               <h4>
                 <a href="">
                  {item.book_name}
                  </a>
               </h4>
               <p>
                {item.pub_id}
                </p>
               <div className="product-bottom-details">
                 <div className="product-price">₹
                  {item.price}
                  </div>
                  <div>
                 {/* <div className='cont'>
                   <button type='sumbit' className='add'
                     onClick={(e) => {
                        e.preventDefault();
                        deletebook(item.id)

                      //  toast.success("Added to Cart");
                     }}
                   >
                     Delete Book
                   </button>
                 </div>
                 <div>
                   <button type='sumbit' className='del'
                     onClick={(e) => {
                        e.preventDefault();
                        updatebook(item.id);

                      //  toast.success("Added to Cart");
                     }}
                   >
                     Update Book
                   </button>
                 </div> */}
                 </div>
                 {/* <div className="product-links">
                   <a href="">
                     <i className="fa fa-heart"></i>
                   </a>
                   <a href="">
                     <i className="fa fa-shopping-cart"></i>
                   </a>
                 </div> */}
               </div>
             </div>
             {/* </Link> */}
           </div>))
    
}
</div>
    </>
    
  )
}

export default Bookdetails