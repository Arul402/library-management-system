// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../Navbar';

// function Editbook() {
//   const [book_stock,setbook_stock]=useState()
//     const [book_name,setbook_name]=useState()
//     const [author_name,setauthor_name]=useState()
//     const [pub_id,setpub_id]=useState()
//     const [price,setprice]=useState()
//     const [image,setimage]=useState()
//     const navigate=useNavigate()
//     const {id}=useParams()
//     const token=sessionStorage.getItem('admin_token')

//     async function handleadd() {
//         const data={
//             book_stock:book_stock,
//             book_name:book_name,
//             author_name:author_name,
//             pub_id:pub_id,
//             price:price,
//             image:image,
//             // is_active:is_activate
//         }
//         if(!((book_stock==="") && (book_name==="") && (author_name==="") && (pub_id==="") && (price==="")) ){
//         try{
//             const response=await axios.put(`http://127.0.0.1:8000/api/v1/app/updatebooks/${id}`,data,{
//                 headers:{
//                     'Content-Type':'application/json',
//                     'Authorization':`Token ${token}`
//                 }
//             })
//             if (response.status===200){
//                 // sessionStorage.setItem('username',data.first_name)
//                 // navigate('/login')
//                 console.log("Book Updated")
//                 toast.success("Book Updated")
//                 navigate('/bookdetails')
//             }else{
//                 // sessionStorage.setItem('username',"")
//             }
//         }
//         catch(error){
//             console.log("error")
//             console.log(error)
//             toast.error("Error")
            
//         }
//         }else{
//         toast.error("Enter the Fields")
//         console.log("Enter the fields")

//     }
        
//     }
//   return (
//     <>
//     <div></div><br/>
//     <div></div><br/>
//     <Navbar/>
//      <div className="body">
//     <div className="form">
//         <ToastContainer theme="colored" transition={Zoom}/>
//             <h2>Update Book</h2>
//             <div className="input">
//             <div className="inputBox">
//                     <label htmlFor="">Book Stock</label>
//                     <input type="text" value={book_stock} onChange={(e)=>{setbook_stock(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Book Name</label>
//                     <input type="text" value={book_name} onChange={(e)=>{setbook_name(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Author Name</label>
//                     <input type="text" value={author_name} onChange={(e)=>{setauthor_name(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Publisher ID</label>
//                     <input type="text" value={pub_id} onChange={(e)=>{setpub_id(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Price</label>
//                     <input type="text" value={price} onChange={(e)=>{setprice(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Image</label>
//                     <input type="file" value={image} onChange={(e)=>{setimage(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Update Book" onClick={(e)=>{e.preventDefault();handleadd()}} /> 
//                 </div>
//             </div>
//             {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
//             <div className="social">
//                 {/* <button type='sumbit' onClick={(e)=>{e.preventDefault();login()}}><p>Have An Account?</p></button> */}
//                 {/* <button><i className="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button> */}
//             </div>
//         </div>  
//         </div>
//     </>
//   )
// }

// export default Editbook



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

function Editbook() {
  const [book_stock, setBookStock] = useState('');
  const [book_name, setBookName] = useState('');
  const [author_name, setAuthorName] = useState('');
  const [pub_id, setPubId] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem('admin_token');

  useEffect(() => {
    // Fetch the existing book data when the component loads
    async function fetchBook() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/updatebooks/${id}`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const data = response.data;
        setBookStock(data.book_stock);
        setBookName(data.book_name);
        setAuthorName(data.author_name);
        setPubId(data.pub_id);
        setPrice(data.price);
        if (data.image) {
          // const baseURL = 'http://127.0.0.1:8000';
          // setPreview(`${baseURL}${data.image}`);
          setImage(data.image)
          // setPreview(data.image);
        }
        console.log(data.image)
        console.log(preview)
      } catch (error) {
        console.error('Error fetching book data:', error);
        toast.error('Failed to load book data');
      }
    }
    fetchBook();
  }, [id, token]);

  async function handleAdd() {
    const formData = new FormData();
    formData.append('book_stock', book_stock);
    formData.append('book_name', book_name);
    formData.append('author_name', author_name);
    formData.append('pub_id', pub_id);
    formData.append('price', price);
    if (image) {
      formData.append('image', image); // Append image only if it's selected
    }

    if (!((book_stock === "") && (book_name === "") && (author_name === "") && (pub_id === "") && (price === ""))) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/app/updatebooks/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          }
        });
        if (response.status === 200) {
          console.log("Book Updated");
          toast.success("Book Updated");
          navigate('/bookdetails');
        } else {
          toast.error("Failed to update book");
        }
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Error updating book");
      }
    } else {
      toast.error("Enter the Fields");
      console.log("Enter the fields");
    }
  }

  return (
    <>
      <div></div><br />
      <div></div><br />
      <Navbar />
      <div className="body">
        <div className="form">
          <ToastContainer theme="colored" transition={Zoom} />
          <h2>Update Book</h2>
          <div className="input">
            <div className="inputBox">
              <label htmlFor="">Book Stock</label>
              <input type="text" value={book_stock} onChange={(e) => setBookStock(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="">Book Name</label>
              <input type="text" value={book_name} onChange={(e) => setBookName(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="">Author Name</label>
              <input type="text" value={author_name} onChange={(e) => setAuthorName(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="">Publisher ID</label>
              <input type="text" value={pub_id} onChange={(e) => setPubId(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="">Price</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="">Image</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              {preview && <img src={preview} alt="Book Preview" width="100" />}
            </div>
            <div className="inputBox">
              <input type="submit" value="Update Book" onClick={(e) => { e.preventDefault(); handleAdd(); }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editbook;
