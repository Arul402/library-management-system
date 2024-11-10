import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

function Addbook() {

  const [book_stock,setbook_stock]=useState()
    const [book_name,setbook_name]=useState()
    const [author_name,setauthor_name]=useState()
    const [pub_id,setpub_id]=useState()
    const [price,setprice]=useState()
    const [image,setImage]=useState()
    const navigate=useNavigate()
    const token=sessionStorage.getItem('admin_token')

    // async function handleadd() {
    //     const formData = new FormData();
    // formData.append('book_stock', book_stock);
    // formData.append('book_name', book_name);
    // formData.append('author_name', author_name);
    // formData.append('pub_id', pub_id);
    // formData.append('price', price);
    // if (image) {
    //   formData.append('image', image); // Append image only if it's selected
    // }
    //     if(!((book_stock==="") && (book_name==="") && (author_name==="") && (pub_id==="") && (price==="")) ){
    //     try{
    //         const response=await axios.post('http://127.0.0.1:8000/api/v1/app/createbook/',formData,{
    //             headers:{
    //                 'Content-Type':'multipart/form-data',
    //                 'Authorization':`Token ${token}`
    //             }
    //         })
    //         if (response.status===200){
    //             // sessionStorage.setItem('username',data.first_name)
    //             // navigate('/login')
    //             console.log("Book Added")
    //             toast.success("Book Added")
    //         }else{
    //             // sessionStorage.setItem('username',"")
    //         }
    //     }
    //     catch(error){
    //         console.log("error")
    //         console.log(error)
    //         toast.error("Error")
            
    //     }
    //     }else{
    //     toast.error("Enter the Fields")
    //     console.log("Enter the fields")

    // }
        
    // }

    async function handleadd() {
        const formData = new FormData();
        formData.append('book_stock', book_stock);
        formData.append('book_name', book_name);
        formData.append('author_name', author_name);
        formData.append('pub_id', pub_id);
        formData.append('price', price);
        if (image) {
          formData.append('image', image);  // Append image file
        }
    
        if (book_stock && book_name && author_name && pub_id && price) {
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/app/createbook/', formData, {
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data',
                
              },
            });
            if (response.status === 200) {
              console.log("Book Added");
              toast.success("Book Added");
              navigate('/admin')
            } else {
              console.log("Failed to add book");
            }
          } catch (error) {
            console.log("Error", error);
            toast.error("Error adding the book");
          }
        } else {
          toast.error("Please fill all the fields");
          console.log("Enter the fields");
        }
      }

    // function login(){
    //     navigate('/')
    // }
  return (
    
    <>
    <div></div><br/>
    <div></div><br/>
    <Navbar/>
    <div className="body">
    <div className="form">
        <ToastContainer theme="colored" transition={Zoom}/>
            <h2>Add Book</h2>
            <div className="input">
            <div className="inputBox">
                    <label htmlFor="">Book Stock</label>
                    <input type="text" value={book_stock} onChange={(e)=>{setbook_stock(e.target.value)}}/>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Book Name</label>
                    <input type="text" value={book_name} onChange={(e)=>{setbook_name(e.target.value)}}/>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Author Name</label>
                    <input type="text" value={author_name} onChange={(e)=>{setauthor_name(e.target.value)}}/>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Publisher ID</label>
                    <input type="text" value={pub_id} onChange={(e)=>{setpub_id(e.target.value)}}/>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Price</label>
                    <input type="text" value={price} onChange={(e)=>{setprice(e.target.value)}}/>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Image</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="inputBox">
                    <input type="submit" name="" value="Add Book" onClick={(e)=>{e.preventDefault();handleadd()}} /> 
                </div>
            </div>
            {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
            <div className="social">
                {/* <button type='sumbit' onClick={(e)=>{e.preventDefault();login()}}><p>Have An Account?</p></button> */}
                {/* <button><i className="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button> */}
            </div>
        </div>  
        </div>
    </>
  )
}

export default Addbook